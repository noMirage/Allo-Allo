import { useEffect, useState } from "react";
import { TLoading } from "../interfaces/typeReduxThunk";
import { utilServer } from "../utils/js/utilServer";

export function useResume<T extends {}>(http: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<TLoading>("idle");
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading("pending");
    const data = await utilServer<T>(http, "get", {}, () => {});
    if (data.success && "data" in data) {
      setData(data.data);
      setLoading("succeeded");
    } else {
      setLoading("failed");
      setError(data.error);
    }
  }

  useEffect(() => {
    getData();
  }, [http]);

  return [data, loading, error];
}
