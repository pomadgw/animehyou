import { useEffect, useState } from "react";
import { Nullable } from 'option-t/lib/Nullable'

export default function useApi<T, E = any>(callback: () => Promise<T>) {
    const [data, setData] = useState<Nullable<T>>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Nullable<E>>(null);

    useEffect(() => {
      (async () => {
        try {
          setData(await callback());
        } catch(e) {
          setError(e as E);
        }

        setIsLoading(false);
      })();
    });

    return { data, isLoading, error };
}
