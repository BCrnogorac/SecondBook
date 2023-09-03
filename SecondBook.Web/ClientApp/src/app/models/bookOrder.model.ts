import { BookDto } from './DTO/bookDto.model';

export class BookOrder {
  book: BookDto;
  quantity: number;

  constructor(book: BookDto, quantity: number) {
    this.book = book;
    this.quantity = quantity;
  }
}
