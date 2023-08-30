import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorBM } from '../models/BM/authorBM.model';
import { Observable } from 'rxjs';
import { AuthorDto } from '../models/DTO/authorDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/author`;
  }
  insertAuthor(author: AuthorBM): Observable<AuthorBM> {
    return this.http.post<AuthorBM>(`${this.serviceBaseUrl}`, author);
  }

  getAuthors(): Observable<AuthorDto[]> {
    return this.http.get<AuthorDto[]>(`${this.serviceBaseUrl}`);
  }
}
