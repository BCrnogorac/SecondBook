import { BookOrder } from './bookOrder.model';

export class Order {
  userId: number;
  bookOrders: BookOrder[];

  constructor(userId: number, bookOrders: BookOrder[]) {
    this.userId = userId;
    this.bookOrders = bookOrders;
  }
}
