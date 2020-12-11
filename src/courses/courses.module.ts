import {Module} from '@nestjs/common';
import {CoursesService} from './courses.service';
import {CoursesController} from './courses.controller';
import {PaymentModule} from "../payment/payment.module";
import {PaymentService} from "../payment/payment.service";

@Module({
    imports: [PaymentModule],
    providers: [CoursesService, PaymentService],
    controllers: [CoursesController]
})
export class CoursesModule {
}
