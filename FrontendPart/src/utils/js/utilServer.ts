import axios from "axios";
import { ApiResult } from "../../interfaces/server";

axios.defaults.withCredentials = true;

export async function utilServer<T>(
  url: string,
  method: "post" | "get" | "patch" | "delete",
  data?: unknown,
  functionRejectWithValue?: (error: any) => void,
  options: boolean = true
): Promise<ApiResult<T>> {
  const headers = options
    ? { "Content-Type": "application/json", Accept: "application/json"  }
    : { Accept: "application/json", 'Content-Type': 'multipart/form-data' };

  try {
    const res = await axios.request({
      url: `http://localhost:8000/api${url}`,
      method,
      data: method !== 'get' ? data : undefined,
      headers,
      withCredentials: true,
    });

    return { ...res.data };
  } catch (error: any) {
    if (functionRejectWithValue) {
       functionRejectWithValue(error?.message || "Помилка...");
    }
    return {
      success: false,
      error: error.response?.data?.message ?? "Помилка...",
    };
  }
}
