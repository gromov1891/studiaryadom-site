import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect на клиенте (без вспышки контента до анимации), useEffect на сервере (без SSR-варнинга).
export const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
