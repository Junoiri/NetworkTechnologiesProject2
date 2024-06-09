import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';
import { LoanDto } from './dto/loan.dto';
import { BookDto } from './dto/book.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081',
    });
  }

  public async login(data: LoginDto): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> = await this.client.post(
        '/login',
        data,
      );

      const token = `Bearer ${response.data}`;
      this.client.defaults.headers.common['Authorization'] = token;
      console.log('Login Token:', token);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('Login error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllBooks(): Promise<ClientResponse<any | null>> {
    try {
      const token = this.client.defaults.headers.common['Authorization'];
      if (!token) {
        console.error(
          'Token missing: No Authorization token found for getAllBooks request',
        );
        throw new Error('Authorization token is required for this operation');
      }
      console.log('Token used in getAllBooks:', token);

      const response: AxiosResponse<any> = await this.client.get(
        '/book/getAll',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('getAllBooks error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async getAllLoans(): Promise<ClientResponse<LoanDto[] | null>> {
    try {
      const token = this.client.defaults.headers.common['Authorization'];
      if (!token) {
        console.error(
          'Token missing: No Authorization token found for getAllLoans request',
        );
        throw new Error('Authorization token is required for this operation');
      }
      console.log('Token used in getAllLoans:', token);

      const response: AxiosResponse<LoanDto[]> = await this.client.get(
        '/loan/getAll',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('getAllLoans error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async addBook(book: {
    bookId?: number;
    isbn?: string;
    title?: string;
    author?: string;
    publisher?: string;
    year?: number;
    availableCopies?: number;
  }) {
    const token = this.client.defaults.headers.common['Authorization'];
    console.log('Token:', token);

    if (!token) {
      throw new Error('Authorization token is missing. Please login first.');
    }

    try {
      const response: AxiosResponse<BookDto> = await this.client.post(
        '/book/add',
        book,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('addBook error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
