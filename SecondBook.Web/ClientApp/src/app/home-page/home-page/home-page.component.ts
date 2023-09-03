import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookDto } from 'src/app/models/DTO/bookDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //info about user
  isAuthed: boolean = false;
  adminRole: boolean = false;

  public books: BookDto[];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.adminRole = this.authService.getUserProperty('role') == 'admin';

      this.bookService.getBooks().subscribe((response) => {
        this.books = response;
      });
    });
  }
}
