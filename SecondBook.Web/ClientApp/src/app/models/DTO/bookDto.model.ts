import { AuthorDto } from './authorDto.model';
import { CategoryDto } from './categoryDto.model';

export class BookDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  category: CategoryDto;
  author: AuthorDto;
}
