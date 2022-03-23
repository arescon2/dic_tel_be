export interface IError {
  error?: boolean;
  message?: string[];
}

export interface IErrorAndData {
  data: any;
  error: IError;
}
