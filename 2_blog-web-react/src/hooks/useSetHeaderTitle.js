import { useEffect } from "react";
import { useTitleContext } from "../context/Title-context";

export function useSetHeaderTitle(title = '未设置标题') {
  const { setTitle } = useTitleContext()
  useEffect(() => {
    document.documentElement.scrollTop = 0
    setTitle(title)
  }, [])
}