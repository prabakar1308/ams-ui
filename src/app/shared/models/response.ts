export interface Response<T> {
  data: T;
  message?: string;
  status?: number;
  apiVersion?: string;
}

export interface ResponseWithToken<T> extends Response<T> {
  token: string;
  expiresIn: number;
  refreshToken?: string;
  refreshTokenExpiresIn?: number;
}
