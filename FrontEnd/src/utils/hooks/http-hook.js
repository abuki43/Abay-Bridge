import { useState, useCallback } from "react";

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const controller = new AbortController();
      const { signal } = controller;

      // Set a timeout of 25 seconds
      const timeout = 25000;
      const timeoutId = setTimeout(() => {
        controller.abort();
        setError(new Error("Request timed out"));
        setIsLoading(false);
      }, timeout);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal,
        });
        clearTimeout(timeoutId); // Clear the timeout if the request completes within the timeout duration
        const data = await response.json();
        // console.log(data);

        if (!response.ok) {
          throw new Error(data.message);
        }

        setIsLoading(false);
        return data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);

        throw error;
      }
    },
    []
  );

  function clearError() {
    setError(null);
  }

  return { isLoading, error, sendRequest, clearError };
}
