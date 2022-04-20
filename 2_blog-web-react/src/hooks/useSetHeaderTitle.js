import { useEffect } from "react";
import { useTitleContext } from "../context/Title-context";

export function useSetHeaderTitle(title) {
  const { setTitle } = useTitleContext()
  useEffect(() => {
    setTitle(title)
  }, [])
}