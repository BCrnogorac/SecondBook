import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //info about user
  isAuthed: boolean = false;
  adminRole: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((response) => {
      this.isAuthed = this.authService.getUserProperty('role') != null;
      this.adminRole = this.authService.getUserProperty('role') == 'admin';
    });
  }
}
