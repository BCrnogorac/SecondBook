import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBM } from '../models/BM/orderBM.model';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/DTO/orderDto.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/order`;
  }

  insertOrder(order: OrderBM): Observable<OrderBM> {
    return this.http.post<OrderBM>(`${this.serviceBaseUrl}`, order);
  }

  getOrderByUserId(userId: number): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.serviceBaseUrl}/userId/${userId}`);
  }
}
