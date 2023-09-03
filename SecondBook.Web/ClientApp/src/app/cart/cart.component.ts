import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookDto } from '../models/DTO/bookDto.model';
import { BookOrderBM } from '../models/BM/bookorderBM.model';
import { OrderBM } from '../models/BM/orderBM.model';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order.model';
import { BookOrder } from '../models/bookOrder.model';
import { OrderService } from '../services/order.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public books: BookDto[] = [];

  public orderInCart: BookOrder[] = [];
  public order: Order[] = [];

  public shouldBeDisabled: boolean = true;

  public totalPrice: number = 0;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private orderService: OrderService,
    private nzMessageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    let responseSub: any;

    this.bookService.booksInCart.subscribe((response) => {
      this.shouldBeDisabled = response ? false : true;
      responseSub = response;
    });

    responseSub?.bookOrders.forEach((el) => {
      this.books.push(el.book);
    });

    this.books.forEach((el) => {
      this.orderInCart?.push(
        new BookOrder(
          el,
          responseSub?.bookOrders.find((e) => e.book.id === el.id).quantity
        )
      );
    });

    if (this.books != null) {
      this.orderInCart.forEach((el) => {
        this.totalPrice += el.book.price * el.quantity;
        console.log('tu');
      });
    }
  }

  removeBookFromCart(book: BookDto) {
    let cart: Order = JSON.parse(localStorage.getItem('order'));

    console.log(cart.bookOrders.find((e) => e.book.id === book.id).quantity);
    this.totalPrice =
      this.totalPrice -
      book.price * cart.bookOrders.find((e) => e.book.id === book.id).quantity;

    cart.bookOrders.splice(
      cart.bookOrders.findIndex((e) => e.book.id === book.id),
      1
    );

    this.orderInCart.splice(
      this.orderInCart.findIndex((e) => e.book === book),
      1
    );

    this.bookService.booksInCart.next(cart);

    localStorage.setItem('order', JSON.stringify(cart));

    this.books.splice(
      this.books.findIndex((e) => e.id === book.id),
      1
    );
  }

  cancel() {}

  onAddBookOrderQuantity(bookId: number) {
    this.orderInCart.find((e) => e.book.id === bookId).quantity += 1;
    this.handleLocalStorage(bookId, true);
    this.bookService.booksInCart.value.bookOrders = this.orderInCart;
    this.totalPrice += this.orderInCart.find(
      (e) => e.book.id === bookId
    ).book.price;
  }

  onSubstractBookOrderQuantity(bookId: number) {
    if (this.orderInCart.find((e) => e.book.id === bookId).quantity != 1) {
      this.orderInCart.find((e) => e.book.id === bookId).quantity -= 1;
      this.handleLocalStorage(bookId, false);
      this.bookService.booksInCart.value.bookOrders = this.orderInCart;

      console.log(this.orderInCart);

      console.log(
        (this.totalPrice -= this.orderInCart.find(
          (e) => e.book.id === bookId
        ).book.price)
      );
    }
  }

  returnBookQuantity(bookId: number) {
    return this.orderInCart?.find((e) => e.book.id === bookId)?.quantity;
  }

  handleLocalStorage(bookId: number, isAddMode: boolean) {
    let orderInLocalStorage: Order = JSON.parse(localStorage.getItem('order'));

    if (isAddMode) {
      orderInLocalStorage.bookOrders.find(
        (e) => e.book.id === bookId
      ).quantity += 1;
    } else {
      orderInLocalStorage.bookOrders.find(
        (e) => e.book.id === bookId
      ).quantity -= 1;
    }

    localStorage.setItem('order', JSON.stringify(orderInLocalStorage));
  }

  onOrderNow() {
    let bookOrders: BookOrderBM[] = [];

    this.orderInCart.forEach((el) => {
      bookOrders.push(new BookOrderBM(el.book.id, el.quantity));
    });

    let orderBM: OrderBM = new OrderBM(
      this.authService.user.value.id,
      bookOrders
    );

    console.log(orderBM);

    this.orderService.insertOrder(orderBM).subscribe((response) => {
      this.nzMessageService.success(`Order done successfully.`);

      this.order = null;
      this.books = [];
      this.orderInCart = [];
      this.totalPrice = 0;
      this.shouldBeDisabled = true;

      this.bookService.booksInCart.next(null);

      localStorage.setItem('order', JSON.stringify(this.order));

      this.router.navigateByUrl('/home');
    });
  }
}
