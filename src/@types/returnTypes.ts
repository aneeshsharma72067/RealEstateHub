export interface ResponseData<T> {
  success: boolean;
  error: string | null;
  data: T | null;
}
