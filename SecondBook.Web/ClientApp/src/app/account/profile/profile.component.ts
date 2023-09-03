import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/DTO/userDto.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: UserDto = null;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.user = response;
    });
  }
}
