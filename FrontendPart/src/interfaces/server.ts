export type ApiResult<T> =
  | { success: true; message: string, data: T }
  | { success: false; error: string };
