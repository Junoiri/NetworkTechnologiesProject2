import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    console.log('LibraryClient initialized');
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
            Authorization: token, // Use the token directly without adding the `Bearer ` prefix
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
}
