import {Body, Controller, Headers, Post} from '@nestjs/common';
import {PaymentService} from "./payment.service";

@Controller('api')
export class PaymentController {

    constructor(private paymentService: PaymentService) {
    }

    @Post("payment/events")
    paymentEvent(@Body() body, @Headers('x-razorpay-signature') signature) {
        return this.paymentService.handlePaymentEvent(body, signature)
    }

}
