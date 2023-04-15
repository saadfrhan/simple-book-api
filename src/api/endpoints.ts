import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class ApiEndpoints {

  protected readonly instance: AxiosInstance;

  public constructor(url: string) {

    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
    this.instance.defaults.headers.post['Content-Type'] = 'application/json';

    this.instance.interceptors.response.use(
      async (response: AxiosResponse): Promise<any> => {
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }
      },
      (error: AxiosError) => {
        const { response, request }: {
          response?: AxiosResponse;
          request?: XMLHttpRequest
        } = error;
        if (response) {
          if (response.status >= 400 && response.status < 500) {
            console.log(response.data?.data?.message, 'error');
            return null;
          }
        } else if (request) {
          console.log('Request failed. Please try again.', 'error');
          return null;
        }
        return Promise.reject(error);
      }
    );

  }

  register = async (clientName: string, clientEmail: string) => {
    const { data: { accessToken } } = await this.instance
      .post<{ accessToken: string }>("/api-clients", {
        clientName,
        clientEmail,
      })
    return {
      token: accessToken,
      clientName,
      clientEmail,
      message: "Successful"
    };
  }

  getBooks = async (type?: string, limit?: number) => {
    const { data } = await this.instance
      .get<{
        id: number,
        name: string,
        type: "non-fiction" | "fiction",
        available: boolean
      }[]>("/books", {
        params: { type, limit }
      })
    return data;
  }

  getBook = async (bookId: string) => {
    const { data } = await this.instance
      .get<{
        id: number,
        name: string,
        type: "non-fiction" | "fiction",
        available: boolean,
        author: string,
        price: number,
        "current-stock": number,
      }>(`/books/${bookId}`)
    return data;
  }

  addOrder = async (bookId: number, customerName: string) => {
    const { data } = await this.instance
      .post<{ created: boolean, orderId: number }>("/orders", {
        bookId, customerName
      }, {
        headers: getAuthorizationHeader()
      })
    return data;
  }

  getOrders = async () => {
    const { data } = await this.instance
      .get<{
        id: string,
        bookId: number,
        customerName: string,
        timestamp: number
      }[]>(`/orders`, {
        headers: getAuthorizationHeader(),
      });
    return data;
  };

  updateOrder = async (orderId: string, customerName: string) => {
    const { data } = await this.instance
      .patch<null | { error: string }>(`/orders/${orderId}`,
        { customerName },
        {
          headers: getAuthorizationHeader(),
        });

    return data?.error ? { updated: false } : { updated: true, orderId };
  }

  deleteOrder = async (orderId: string) => {
    const { data } = await this.instance
      .patch<null | { error: string }>(`/orders/${orderId}`, {
        headers: getAuthorizationHeader()
      });
    return data?.error ? { deleted: false } : { deleted: true, orderId };
  }

}