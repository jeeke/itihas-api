import {Injectable} from "@nestjs/common";
import {ContactUsDto} from "./contact-us.dto";
import {ContactFormEntity} from "./entities/contact-form.entity";

@Injectable()
export class AppService {

    contactUs(contactUsDto: ContactUsDto): Promise<any> {
        const form = ContactFormEntity.create({...contactUsDto})
        return form.save()
    }
}
