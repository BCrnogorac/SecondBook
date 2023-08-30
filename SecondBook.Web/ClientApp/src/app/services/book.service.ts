import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookBM } from '../models/BM/bookBM.model';
import { BookDto } from '../models/DTO/bookDto.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private serviceBaseUrl = '';

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/book`;
  }

  insertBook(book: BookBM): Observable<BookBM> {
    return this.http.post<BookBM>(`${this.serviceBaseUrl}`, book);
  }

  editBook(book: BookDto): Observable<BookDto> {
    return this.http.put<BookDto>(`${this.serviceBaseUrl}`, book);
  }

  getBooks(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(`${this.serviceBaseUrl}`);
  }

  deleteBookById(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceBaseUrl}/${bookId}`);
  }

  getBooksByAuthorId(authorId: number): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(
      `${this.serviceBaseUrl}/author/${authorId}`
    );
  }

  getBooksByCategoryId(categoryId: number): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(
      `${this.serviceBaseUrl}/category/${categoryId}`
    );
  }

  getBooksByAuthorIdCategoryId(
    authorId: number,
    categoryId: number
  ): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(
      `${this.serviceBaseUrl}/category/${categoryId}/author/${authorId}`
    );
  }
}
