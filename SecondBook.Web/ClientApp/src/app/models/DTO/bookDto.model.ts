import { AuthorDto } from './authorDto.model';
import { CategoryDto } from './categoryDto.model';

export class BookDto {
  id: number;
  name: string;
  description: string;
  publishedDate: Date;
  price: number;
  category: CategoryDto;
  author: AuthorDto;
}
