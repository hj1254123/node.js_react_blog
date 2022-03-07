import { useCallback, useEffect } from "react";

export default function useLockPageScrollForMobileOnly(lock) {
  const fn = useCallback(e => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    if(lock) {
      document.body.addEventListener('touchmove', fn, { passive: false });
    } else {
      document.body.removeEventListener('touchmove', fn);
    }
  }, [lock])
}