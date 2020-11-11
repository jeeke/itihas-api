import {Controller} from '@nestjs/common';
import {PaymentService} from "./payment.service";

@Controller('api')
export class PaymentController {

    constructor(private paymentService: PaymentService) {
    }

}