import axios from "axios";

export async function utilServer<T>(
  url: string,
  type: "post" | "get",
  dataToServer: {},
  functionRejectWithValue?: (error: any) => void
): Promise<T | void> {
  try {
    let data = null;

    if (type === "post") {
      data = await axios.post(`http://localhost:8000/api${url}`, dataToServer, {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      data = await axios.get(url);
    }

    if (data.status !== 200) throw Error("something wrong");

    return data.data;
  } catch (err) {
    if (err instanceof Error) {
      if (functionRejectWithValue) {
        throw functionRejectWithValue(err.message);
      }
    }
    return;
  }
}
