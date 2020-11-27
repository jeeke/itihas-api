import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {AuthService} from './auth/auth.service';
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {PaymentModule} from './payment/payment.module';
import {AppService} from "./app.service";
import { BooksModule } from './books/books.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            exclude: ['/api*'],
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        PaymentModule,
        BooksModule,
        BlogsModule
    ],
    controllers: [AppController],
    providers: [AuthService, AppService],
})
export class AppModule {
}
