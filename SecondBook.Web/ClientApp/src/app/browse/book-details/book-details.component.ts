import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookOrderBM } from 'src/app/models/BM/bookorderBM.model';
import { OrderBM } from 'src/app/models/BM/orderBM.model';
import { BookDto } from 'src/app/models/DTO/bookDto.model';
import { BookOrder } from 'src/app/models/bookOrder.model';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input() bookId: number;

  public book: BookDto = null;
  public cartBooks: BookDto[] = [];
  public order: Order = new Order(null, null);

  public isInCart: boolean = false;

  public hasEnoughBookQuantity: boolean;

  constructor(
    private bookService: BookService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(+this.router.url.split('?')[0].split('/').pop());

    this.route.paramMap.subscribe((params) => {
      this.bookId = +params.get('id');

      this.getBookById(this.bookId);
      this.checkCart();
    });

    //this.bookId = +this.router.url.split('?')[0].split('/').pop();
  }

  getBookById(bookId: number) {
    this.bookService.getBooksById(bookId).subscribe((response) => {
      this.book = response;

      if (this.book.quantity > 0) {
        this.hasEnoughBookQuantity = true;
      }
    });
  }

  onAddToCart(book: BookDto) {
    this.order = JSON.parse(localStorage.getItem('order'));

    if (this.order == null) {
      this.order = new Order(this.authService.user.value.id, []);
    }

    this.order.bookOrders.push(new BookOrder(book, 1));

    localStorage.setItem('order', JSON.stringify(this.order));

    if (this.order?.bookOrders.find((e) => e.book.id === book.id) != null) {
      this.isInCart = true;
    } else {
      this.isInCart = false;
    }
    this.bookService.booksInCart.next(this.order);
  }

  checkCart() {
    this.order = JSON.parse(localStorage.getItem('order'));

    if (this.order?.bookOrders.find((e) => e.book.id === this.bookId) != null) {
      this.isInCart = true;
    } else {
      this.isInCart = false;
    }
  }
}
