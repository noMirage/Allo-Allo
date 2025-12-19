import axios from "axios";

export async function utilServer<T>(
  url: string,
  type: "post" | "get",
  dataToServer: {},
  functionRejectWithValue?: (error: any) => void
): Promise<T | void | string> {
  try {
    let data = null;

    if (type === "post") {
      data = await axios.post(`http://localhost:8000/api${url}`, dataToServer, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } else {
      data = await axios.get(`http://localhost:8000/api${url}`, {
        withCredentials: true,
      });
    }

    if (data.status !== 200) throw Error("something wrong");
    return data.data;
  } catch (err) {
    if (
      err instanceof Error &&
      "response" in err &&
      typeof err.response === "object" &&
      err.response &&
      "data" in err.response &&
      err.response.data &&
      typeof err.response.data === "object" &&
      "message" in err.response.data &&
      err.response.data.message &&
      typeof err.response.data.message === "string"
    ) {
      if (functionRejectWithValue) {
        throw functionRejectWithValue(err.message);
      }
      return err.response.data.message;
    }
    return;
  }
}
