import { useCallback, useEffect } from "react";
import { useMedia } from 'react-use'

import { MaxWidth1240px } from '../common/constant'

export default function useLockPageScrollForMobileOnly(lock) {
  const isMaxWidth1240px = useMedia(MaxWidth1240px)

  const fn = useCallback(e => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    if(lock) {
      // 大屏特殊处理
      if(!isMaxWidth1240px) {
        document.body.removeEventListener('touchmove', fn)
        return
      }
      // 阻止滚动
      document.body.addEventListener('touchmove', fn, { passive: false });
    } else {
      // 恢复滚动
      document.body.removeEventListener('touchmove', fn);
    }

  }, [lock, isMaxWidth1240px])
}