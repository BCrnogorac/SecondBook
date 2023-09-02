import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookDto } from '../models/DTO/bookDto.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public books: BookDto[];

  public totalPrice: number = 0;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.booksInCart.subscribe((response) => {
      this.books = response;
    });

    if (this.books != null) {
      this.books.forEach((el) => {
        this.totalPrice += el.price;
      });
    }
  }

  removeBookFromCart(book: BookDto) {
    let cart: BookDto[] = JSON.parse(localStorage.getItem('books'));

    cart.splice(
      cart.findIndex((e) => e.id === book.id),
      1
    );

    this.bookService.booksInCart.next(cart);

    localStorage.setItem('books', JSON.stringify(cart));

    this.totalPrice = this.totalPrice - book.price;
    console.log(book.price);
    //console.log(this.totalPrice);
  }

  cancel() {}
}
