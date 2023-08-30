import { Component, OnInit } from '@angular/core';
import { BookDto } from '../models/DTO/bookDto.model';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { CategoryService } from '../services/category.service';
import { AuthorDto } from '../models/DTO/authorDto.model';
import { CategoryDto } from '../models/DTO/categoryDto.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  public books: BookDto[];
  public authors: AuthorDto[];
  public categories: CategoryDto[];

  public selectedAuthor: any = null;
  public selectedCategory: any = null;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response) => {
      this.authors = response;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onFilteredByAuthor(authorId: number) {
    if (authorId == null && this.selectedCategory == null) {
      this.getBooks();
    }

    if (authorId == null && this.selectedCategory != null) {
      console.log('tu sam');
      this.onFilteredByCategory(this.selectedCategory);
    }

    if (this.selectedCategory == null && authorId != null) {
      this.bookService.getBooksByAuthorId(authorId).subscribe((response) => {
        this.books = response;
      });
    }

    if (this.selectedCategory != null && authorId != null) {
      this.bookService
        .getBooksByAuthorIdCategoryId(authorId, this.selectedCategory)
        .subscribe((response) => {
          this.books = response;
        });
    }
  }

  onFilteredByCategory(categoryId: number) {
    if (categoryId == null && this.selectedAuthor == null) {
      this.getBooks();
    }

    if (categoryId == null && this.selectedAuthor != null) {
      this.onFilteredByAuthor(this.selectedAuthor);
    }

    if (this.selectedAuthor == null && categoryId != null) {
      this.bookService
        .getBooksByCategoryId(categoryId)
        .subscribe((response) => {
          this.books = response;
        });
    }

    if (this.selectedAuthor != null && categoryId != null) {
      this.bookService
        .getBooksByAuthorIdCategoryId(this.selectedAuthor, categoryId)
        .subscribe((response) => {
          this.books = response;
        });
    }
  }
}
