import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/models/DTO/orderDto.model';
import { UserDto } from 'src/app/models/DTO/userDto.model';
import { BookOrder } from 'src/app/models/bookOrder.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { IdEncryptor } from 'src/app/shared/idEncrypt.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: UserDto = null;
  public orders: OrderDto[];
  public books: BookOrder[];
  public totalPrice: number = 0;

  public selectedOrder: any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.user = response;

      this.orderService.getOrderByUserId(this.user.id).subscribe((response) => {
        console.log(response);
        this.orders = response;
        this.books = [];
      });
    });
  }

  encrypt(orderId: number) {
    let encryptname = IdEncryptor.encrypt(orderId);

    return 'Order ID#' + encryptname;
  }

  onOrderClicked(orderId: number) {
    console.log(orderId);
    this.books = this.orders.find((e) => e.id === orderId).bookOrders;
    this.totalPrice = this.orders.find((e) => e.id === orderId).price;
  }
}
