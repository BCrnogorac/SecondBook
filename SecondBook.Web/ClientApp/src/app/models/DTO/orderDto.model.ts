import { BookOrderBM } from '../BM/bookorderBM.model';
import { BookDto } from './bookDto.model';

export class OrderDto {
  id: number;
  books: BookDto[];
  createdDate: Date;
  price: number;

  constructor(id: number, books: BookDto[], createdDate: Date, price: number) {
    this.id = id;
    this.books = books;
    this.createdDate = createdDate;
    this.price = price;
  }
}
