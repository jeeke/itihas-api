import {Injectable, Logger} from '@nestjs/common';

import * as config from 'config';
const RazorpayConfig = config.get('razorpay');

@Injectable()
export class PaymentService {
    constructor(
    ) {
    }

    private logger = new Logger("PaymentService");

}