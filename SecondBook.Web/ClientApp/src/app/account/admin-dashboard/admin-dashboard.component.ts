import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthorBM } from 'src/app/models/BM/authorBM.model';
import { BookBM } from 'src/app/models/BM/bookBM.model';
import { CategoryBM } from 'src/app/models/BM/categoryBM.model';
import { AuthorDto } from 'src/app/models/DTO/authorDto.model';
import { BookDto } from 'src/app/models/DTO/bookDto.model';
import { CategoryDto } from 'src/app/models/DTO/categoryDto.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public authorFormGroup: FormGroup;
  public categoryFormGroup: FormGroup;
  public bookFormGroup: FormGroup;

  public authors: AuthorDto[];
  public categories: CategoryDto[];
  public books: BookDto[];

  public isBookEditMode: boolean = false;
  public isAuthorEditMode: boolean = false;
  public isCategoryEditMode: boolean = false;

  public currentEditBook: BookDto;
  public currentEditAuthor: AuthorDto;
  public currentEditCategory: CategoryDto;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private notification: NzNotificationService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.getAuthors();
    this.getCategories();
    this.getBooks();
    this.initCategoryForm();
    this.initAuthorForm();
    this.initBookForm();
  }

  initAuthorForm(): void {
    this.authorFormGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  initCategoryForm(): void {
    this.categoryFormGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  initBookForm(): void {
    this.bookFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
    });
  }

  submitAuthorForm() {
    if (this.isAuthorEditMode != true) {
      let formModel: AuthorBM = this.authorFormGroup.getRawValue();

      if (this.authorFormGroup.valid) {
        this.authorService.insertAuthor(formModel).subscribe((repsonse) => {
          this.initAuthorForm();
          this.getAuthors();
          this.notification.blank(
            'Added Author!',
            `You have added author ${formModel.name}.`
          );
        });
      } else {
        Object.values(this.authorFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    } else {
      let formModelEdit: AuthorDto = this.authorFormGroup.getRawValue();

      formModelEdit.id = this.currentEditAuthor.id;

      if (this.authorFormGroup.valid) {
        this.authorService.editAuthor(formModelEdit).subscribe((repsonse) => {
          this.initAuthorForm();
          this.getAuthors();
          this.isAuthorEditMode = false;

          this.notification.blank(
            'Edited Author!',
            `You have edited author ${formModelEdit.name}.`
          );
        });
      } else {
        Object.values(this.authorFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  }

  submitBookForm() {
    if (this.isBookEditMode != true) {
      let formModelInsert: BookBM = this.bookFormGroup.getRawValue();

      if (this.bookFormGroup.valid) {
        this.bookService.insertBook(formModelInsert).subscribe((repsonse) => {
          this.initBookForm();
          this.getBooks();

          this.notification.blank(
            'Added Book!',
            `You have added book ${formModelInsert.name}.`
          );
        });
      } else {
        Object.values(this.authorFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    } else {
      let formModelEdit: BookDto = this.bookFormGroup.getRawValue();

      formModelEdit.id = this.currentEditBook.id;
      console.log(formModelEdit);

      if (this.bookFormGroup.valid) {
        this.bookService.editBook(formModelEdit).subscribe((repsonse) => {
          this.initBookForm();
          this.getBooks();
          this.isBookEditMode = false;

          this.notification.blank(
            'Edited Book!',
            `You have edited book ${formModelEdit.name}.`
          );
        });
      } else {
        Object.values(this.bookFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  }

  submitCategoryForm() {
    if (this.isCategoryEditMode != true) {
      let formModel: CategoryBM = this.categoryFormGroup.getRawValue();

      if (this.categoryFormGroup.valid) {
        this.categoryService.insertCategory(formModel).subscribe((repsonse) => {
          this.initCategoryForm();
          this.getCategories();
          this.notification.blank(
            'Added Category!',
            `You have added category ${formModel.name}.`
          );
        });
      } else {
        Object.values(this.categoryFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    } else {
      let formModelEdit: CategoryDto = this.categoryFormGroup.getRawValue();

      formModelEdit.id = this.currentEditCategory.id;

      if (this.categoryFormGroup.valid) {
        this.categoryService
          .editCategory(formModelEdit)
          .subscribe((repsonse) => {
            this.initCategoryForm();
            this.getCategories();
            this.isCategoryEditMode = false;

            this.notification.blank(
              'Edited Category!',
              `You have edited category ${formModelEdit.name}.`
            );
          });
      } else {
        Object.values(this.categoryFormGroup.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
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

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });
  }

  cancel(): void {}

  deleteAuthor(author: AuthorDto) {
    this.authorService.deleteAuthorById(author.id).subscribe((response) => {
      this.nzMessageService.success(
        `Deleted author ${author.name} successfully.`
      );
      this.getAuthors();
    });
  }

  deleteCategory(category: CategoryDto) {
    this.categoryService
      .deleteCategoryById(category.id)
      .subscribe((response) => {
        this.nzMessageService.success(
          `Deleted category ${category.name} successfully.`
        );
        this.getCategories();
      });
  }

  deleteBook(book: BookDto) {
    this.bookService.deleteBookById(book.id).subscribe((response) => {
      this.nzMessageService.success(`Deleted book ${book.name} successfully.`);
      this.getBooks();
    });
  }

  editBook(book: BookDto) {
    this.bookFormGroup = this.fb.group({
      name: [book.name, [Validators.required]],
      description: [book.description, [Validators.required]],
      imageUrl: [book.imageUrl, [Validators.required]],
      price: [book.price, [Validators.required]],
      quantity: [book.quantity, [Validators.required]],
      categoryId: [book.category.id, [Validators.required]],
      authorId: [book.author.id, [Validators.required]],
    });

    this.isBookEditMode = true;
    this.currentEditBook = book;
  }

  editAuthor(author: AuthorDto) {
    this.authors.splice(
      this.authors.findIndex((e) => e.id === author.id),
      1
    );

    this.authorFormGroup = this.fb.group({
      name: [author.name, [Validators.required]],
    });

    this.isAuthorEditMode = true;
    this.currentEditAuthor = author;
  }

  editCategory(category: CategoryDto) {
    this.categories.splice(
      this.categories.findIndex((e) => e.id === category.id),
      1
    );

    this.categoryFormGroup = this.fb.group({
      name: [category.name, [Validators.required]],
    });

    this.isCategoryEditMode = true;
    this.currentEditCategory = category;
  }
}
