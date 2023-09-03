import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { BookDto } from 'src/app/models/DTO/bookDto.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //user or roles info
  public isAuthed: boolean = false;
  public companyRole: boolean = false;
  public adminRole: boolean = false;

  public homeRoute: boolean = true;
  public browseRoute: boolean = false;
  public registerRoute: boolean = false;
  public loginRoute: boolean = false;
  public profileRoute: boolean = false;
  public cartRoute: boolean = false;

  public books: BookDto[];

  public selectedBook: any;

  public cartNumber: number = 0;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      if (response == null) {
        this.authService.autoLogin();
      }

      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.adminRole = this.authService.getUserProperty('role') == 'admin';

      this.checkCartNumber();
      this.routeResolver();
      this.getBooks();
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });
  }

  searchBook(bookId: number): void {
    console.log('tu sam');
    if (bookId != null) {
      this.router.navigateByUrl(`/browse/book-details/${bookId}`);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.message.success('Logged out.');
  }

  checkCartNumber() {
    let cart: Order = JSON.parse(localStorage.getItem('order'));

    this.cartNumber = cart == null ? 0 : cart.bookOrders.length;

    this.bookService.booksInCart.next(cart);

    this.bookService.booksInCart.subscribe((response) => {
      this.cartNumber = response == null ? 0 : response.bookOrders.length;
    });

    if (this.cartNumber == null || undefined) {
      this.cartNumber = 0;
    }
  }

  routeResolver() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((navEnd: NavigationEnd) => {
        switch (navEnd.urlAfterRedirects) {
          case '/home':
            this.homeRoute = true;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            this.cartRoute = false;
            break;
          case '/browse':
            this.homeRoute = false;
            this.browseRoute = true;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            this.cartRoute = false;
            break;
          case '/administration':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            this.cartRoute = false;
            break;

          case '/register':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = true;
            this.loginRoute = false;
            this.profileRoute = false;
            this.cartRoute = false;
            break;
          case '/login':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = true;
            this.profileRoute = false;
            this.cartRoute = false;
            break;
          case '/profile':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = true;
            this.cartRoute = false;
            break;
          case '/admin-dashboard':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = true;
            this.cartRoute = false;
            break;

          case '/cart':
            this.homeRoute = false;
            this.browseRoute = false;
            this.registerRoute = false;
            this.loginRoute = false;
            this.profileRoute = false;
            this.cartRoute = true;
            break;
        }
      });
  }
}
