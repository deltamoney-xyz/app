import { useCallback, useState } from "react";

export const useLocalStorage = () => {
  const useLocalStorageState = (key, defaultState, session) => {
    const storage = session ? sessionStorage : localStorage;
    const [state, setState] = useState(() => {
      try {
        let storedState = storage.getItem(key);
        if (storedState) {
          return JSON.parse(storedState || "");
        }
      } catch (error) {
        if (typeof window !== "undefined") {
          console.error(error);
        }
      }
      return defaultState;
    });

    const setLocalStorageState = useCallback(
      (newState) => {
        setState(newState);
        if (newState === null) {
          storage.removeItem(key);
        } else {
          storage.setItem(key, JSON.stringify(newState));
        }
      },
      [key, storage]
    );

    return [state, setLocalStorageState];
  };

  return { useLocalStorageState };
};
