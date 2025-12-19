import axios from "axios";
import { ApiResult } from "../../interfaces/server";

export async function utilServer<T>(
  url: string,
  method: "post" | "get",
  data?: unknown,
  functionRejectWithValue?: (error: any) => void
): Promise<ApiResult<T>> {
  try {
    const res =
      method === "post"
        ? await axios.post(`http://localhost:8000/api${url}`, data, {
            withCredentials: true,
          })
        : await axios.get(`http://localhost:8000/api${url}`, {
            withCredentials: true,
          });

    return { ...res.data };
  } catch (error: any) {
    if (functionRejectWithValue) {
      throw functionRejectWithValue(error?.message || "Помилка...");
    }
    return {
      success: false,
      error: error.response?.data?.message ?? "Помилка...",
    };
  }
}
