import { useEffect, useState } from "react";
import { TLoading } from "../interfaces/typeReduxThunk";
import { utilServer } from "../utils/js/utilServer";
import { IPagination } from "../interfaces/pagination";

export function useResume<T extends {}>(http: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<TLoading>("idle");
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<IPagination>();

  async function getData() {
    setLoading("pending");
    const data = await utilServer<T>(http, "get", {}, () => {});
    if (data.success && "data" in data) {
      setData(data.data);
      if ("pagination" in data) {
        setPagination(data.pagination as IPagination);
      }
      setLoading("succeeded");
    } else {
      setLoading("failed");
      setError(data.error);
    }
  }

  useEffect(() => {
    getData();
  }, [http]);

  return [data, pagination, loading, error];
}
