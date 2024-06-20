import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';
import { LoanDto } from './dto/loan.dto';
import { BookDto } from './dto/book.dto';
import { AddUserRequestDto, UserDto } from './dto/user.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;
  private userId: number | null | undefined = null;
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

  public async isLoggedIn(): Promise<boolean> {
    try {
      const token = localStorage.getItem('token'); // replace 'token' with the key you use to store the token
      const response: AxiosResponse<any> = await this.client.get(
        '/isLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error checking login status:', error.message);
      }
      return false;
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
      console.log('Token used in getAllBooks:', token);

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
  public async getLoansForCurrentUser(): Promise<
    ClientResponse<LoanDto[] | null>
  > {
    if (this.userId === null || this.userId === undefined) {
      console.error('User ID is not set. Please login first.');
      throw new Error('User ID is required for this operation');
    }

    try {
      const token = this.client.defaults.headers.common['Authorization'];
      console.log('Token used in getLoansForCurrentUser:', token);

      const response: AxiosResponse<LoanDto[]> = await this.client.get(
        `/loan/user/${this.userId}`,
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
      console.error('getLoansForCurrentUser error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async addBook(book: BookDto): Promise<ClientResponse<BookDto | null>> {
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
  public async addLoan(loan: LoanDto): Promise<ClientResponse<LoanDto | null>> {
    const token = this.client.defaults.headers.common['Authorization'];
    console.log('Token:', token);

    if (!token) {
      throw new Error('Authorization token is missing. Please login first.');
    }

    try {
      const response: AxiosResponse<LoanDto> = await this.client.post(
        '/loan/add',
        loan,
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
      console.error('addLoan error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async getAllUsers(): Promise<ClientResponse<UserDto[] | null>> {
    try {
      const token = this.client.defaults.headers.common['Authorization'];
      console.log('Token used in getAllUsers:', token);

      const response: AxiosResponse<UserDto[]> = await this.client.get(
        '/user/getAll',
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
      console.error('getAllUsers error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoansForReader(): Promise<ClientResponse<LoanDto[] | null>> {
    // Call getUserId and wait for it to complete
    const userResponse = await this.getUserId();
    if (!userResponse.success) {
      console.error('Failed to fetch user ID:', userResponse);
      throw new Error('User ID is required for this operation');
    }

    // Use the user ID directly from the response
    const userId = userResponse.data;

    try {
      const token = this.client.defaults.headers.common['Authorization'];
      console.log('Token used in getLoansForReader:', token);
      console.log('userId:', userId);

      const response: AxiosResponse<LoanDto[]> = await this.client.get(
        `/loan/user/${userId}`,
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
      console.error('getLoansForReader error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUserId(): Promise<ClientResponse<UserDto | null>> {
    const token = this.client.defaults.headers.common['Authorization'];
    if (!token) {
      console.error(
        'Token missing: No Authorization token found for decodeToken request',
      );
      throw new Error('Authorization token is required for this operation');
    }

    try {
      const response: AxiosResponse<UserDto> = await this.client.get(
        '/user/current',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('Current User:', response.data);

      this.userId = response.data.id;

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('decodeToken error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async getUserById(
    userId: number,
  ): Promise<ClientResponse<UserDto | null>> {
    const token = this.client.defaults.headers.common['Authorization'];
    if (!token) {
      console.error(
        'Token missing: No Authorization token found for getUserById request',
      );
      throw new Error('Authorization token is required for this operation');
    }

    try {
      const response: AxiosResponse<UserDto> = await this.client.get(
        `/user/${userId}/current`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('User:', response.data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('getUserById error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async isUserStaff(userId: number): Promise<boolean> {
    try {
      const response = await this.getUserById(userId);
      if (!response.success || !response.data) {
        console.error('Failed to fetch user:', response);
        return false;
      }

      const user: UserDto = response.data;

      return user.role === 'ROLE_STAFF';
    } catch (error) {
      if (error instanceof Error) {
        console.error('isUserStaff error:', error.message);
      } else {
        console.error('isUserStaff error:', error);
      }
      return false;
    }
  }
  public async getUserLoanCount(userId: number): Promise<number> {
    try {
      const token = this.client.defaults.headers.common['Authorization'];
      if (!token) {
        console.error(
          'Token missing: No Authorization token found for getUserLoanCount request',
        );
        throw new Error('Authorization token is required for this operation');
      }

      const response: AxiosResponse<number> = await this.client.get(
        `/user/${userId}/loanCount`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('getUserLoanCount error:', axiosError.message);
      throw axiosError;
    }
  }
  public async addUser(
    user: AddUserRequestDto,
  ): Promise<ClientResponse<AddUserRequestDto | null>> {
    const token = this.client.defaults.headers.common['Authorization'];
    console.log('Token:', token);

    if (!token) {
      throw new Error('Authorization token is missing. Please login first.');
    }

    try {
      const response: AxiosResponse<AddUserRequestDto> = await this.client.post(
        '/user/add',
        user,
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
      console.error('addUser error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async returnLoan(id: number): Promise<ClientResponse<null>> {
    const token = this.client.defaults.headers.common['Authorization'];
    console.log('Token:', token);

    if (!token) {
      throw new Error('Authorization token is missing. Please login first.');
    }

    try {
      const response: AxiosResponse<null> = await this.client.put(
        `/loan/return/${id}`,
        null,
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
      console.error('returnLoan error:', axiosError.message);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
