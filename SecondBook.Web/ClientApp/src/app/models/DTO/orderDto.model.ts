import { BookOrderBM } from '../BM/bookorderBM.model';
import { BookOrder } from '../bookOrder.model';
import { BookDto } from './bookDto.model';

export class OrderDto {
  id: number;
  bookOrders: BookOrder[];
  createdDate: Date;
  price: number;

  constructor(
    id: number,
    bookOrders: BookOrder[],
    createdDate: Date,
    price: number
  ) {
    this.id = id;
    this.bookOrders = bookOrders;
    this.createdDate = createdDate;
    this.price = price;
  }
}
