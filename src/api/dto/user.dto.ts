import { BookDto } from './book.dto';

export class UserDto {
  name?: string;
  email?: string;
  role?: string;
  id?: number;
}

export class UserResponseDto {
  username?: string;
  email?: string;
  id?: number;
  borrowedBooks?: number;
}

export class AddUserRequestDto {
  name: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  id: number = 0;
  username: string = '';
}
