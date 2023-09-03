import { BookOrderBM } from './bookorderBM.model';

export class OrderBM {
  userId: number;
  bookOrders: BookOrderBM[];

  constructor(userId: number, bookOrders: BookOrderBM[]) {
    this.userId = userId;
    this.bookOrders = bookOrders;
  }
}
