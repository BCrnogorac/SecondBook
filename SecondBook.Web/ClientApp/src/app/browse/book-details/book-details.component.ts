import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDto } from 'src/app/models/DTO/bookDto.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  public bookId: number;

  public book: BookDto = null;
  public cartBooks: BookDto[] = [];

  public isInCart: boolean = false;

  public hasEnoughBookQuantity: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(+this.router.url.split('?')[0].split('/').pop());
    this.bookId = +this.router.url.split('?')[0].split('/').pop();

    this.getBookById(this.bookId);
    this.checkCart();
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
    this.cartBooks = JSON.parse(localStorage.getItem('books'));

    if (this.cartBooks == null) {
      this.cartBooks = [];
    }

    this.cartBooks.push(book);

    localStorage.setItem('books', JSON.stringify(this.cartBooks));

    if (this.cartBooks?.find((e) => e.id === book.id) != null) {
      this.isInCart = true;
    } else {
      this.isInCart = false;
    }

    this.bookService.booksInCart.next(this.cartBooks);
  }

  checkCart() {
    this.cartBooks = JSON.parse(localStorage.getItem('books'));

    if (this.cartBooks?.find((e) => e.id === this.bookId) != null) {
      this.isInCart = true;
    } else {
      this.isInCart = false;
    }
  }
}
