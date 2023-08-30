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

      this.books.forEach((el) => {
        this.totalPrice += el.price;
      });
    });
  }
}
