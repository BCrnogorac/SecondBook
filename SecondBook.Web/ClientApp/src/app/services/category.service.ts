import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryBM } from '../models/BM/categoryBM.model';
import { CategoryDto } from '../models/DTO/categoryDto.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/category`;
  }
  insertCategory(category: CategoryBM): Observable<CategoryBM> {
    return this.http.post<CategoryBM>(`${this.serviceBaseUrl}`, category);
  }

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.serviceBaseUrl}`);
  }
}
