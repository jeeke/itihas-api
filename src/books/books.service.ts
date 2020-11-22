import { Injectable } from '@nestjs/common';
import {Book} from "../entities/book.entity";

@Injectable()
export class BooksService {

    getBooks() {
        return Book.find();
    }
}
