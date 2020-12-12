import {BadRequestException, ConflictException, Injectable, Logger} from '@nestjs/common';

import * as config from 'config';
import {User} from "../entities/user.entity";
import {Transaction} from "../entities/txn.entity";
import {TxnStatus} from "../entities/txn.status";
import {Course} from "../entities/course.entity";
import * as Razorpay from "razorpay"
import {UnknownElementException} from "@nestjs/core/errors/exceptions/unknown-element.exception";
import {Connection} from "typeorm/index";

const RazorpayConfig = config.get('razorpay');

@Injectable()
export class PaymentService {
    constructor(private connection: Connection) {
    }

    private logger = new Logger("PaymentService");

    async initializeCourseEnrollment(user: User, courseId: number) {
        const c = await Course.findOne(courseId);
        if (await c.isEnrolled(user)) throw new BadRequestException("Already enrolled in course");
        const amount = c.price
        if (amount <= 0) throw new BadRequestException('Amount must be greater than zero!')
        const instance = new Razorpay({key_id: RazorpayConfig.keyId, key_secret: RazorpayConfig.keySecret});
        const options = {
            amount: amount * 100,
            currency: "INR"
        };
        const order = await instance.orders.create(options);
        const txn = new Transaction();
        txn.user = user;
        txn.course = c;
        txn.txn_status = TxnStatus.Processing;
        txn.order_id = order.id;
        await txn.save();
        return order;
    }

    // ----------------------------Razorpay Webhook Events----------------------------

    async handlePaymentEvent(body, signature) {
        const verified = await Razorpay.validateWebhookSignature(JSON.stringify(body), signature, RazorpayConfig.webhookSecret)
        if (verified === true) {
            // this.logger.log("Webhook Body", JSON.stringify(body))
            // this.logger.log("Webhook Signature", JSON.stringify(signature))
            const payment = body.payload.payment.entity
            const txn = await Transaction.findOne({
                where: {
                    order_id: payment.order_id
                },
                relations: ["user", "course"]
            });
            if (!txn) throw new UnknownElementException('Transaction Not Found!')
            if (body.event === 'payment.captured') {
                await this.handlePaymentCapturedEvent(payment, txn);
            } else if (body.event === 'payment.failed') {
                await this.handlePaymentFailedEvent(payment, txn)
            } else {
                this.logger.error("Unknown Payment Event", JSON.stringify(body))
                throw new UnknownElementException("Unknown payment event!");
            }
        } else {
            throw new BadRequestException("Payment Not Verified!");
        }
    }

    async handlePaymentCapturedEvent(payment, txn: Transaction) {
        const {status, amount, captured} = payment
        if (txn.txn_status !== TxnStatus.Processing) return "Already Settled!";
        if (status === 'captured' && captured && txn.course.price * 100 === amount) {
            txn.txn_status = TxnStatus.Successful

            return await this.connection.transaction(async manager => {
                const userRepository = manager.getRepository<User>("user");
                const txnRepo = manager.getRepository<Transaction>("transaction");
                const user = await userRepository.findOne({
                    where: {
                        id: txn.user.id
                    },
                    relations: ["enrolled_courses"]
                });
                user.enrolled_courses.push(txn.course)
                await userRepository.save(user);
                await txnRepo.save(txn);
            });
        } else throw new ConflictException('Payment tampered!');
    }

    async handlePaymentFailedEvent(payment, txn: Transaction) {
        const {status} = payment
        if (txn.txn_status !== TxnStatus.Processing) return "Already Settled!";
        if (status === "failed") {
            txn.txn_status = TxnStatus.Failed
            return await txn.save();
        } else throw new ConflictException('Data Mismatch!');
    }

}
