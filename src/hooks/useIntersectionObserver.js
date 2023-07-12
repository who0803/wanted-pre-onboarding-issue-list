// 받아야할 거
// 종료조건
// callback 함수
// 옵션

// return
// ref
// 완료 불리언
import { useEffect, useState, useRef, useCallback } from 'react';

export const useIntersectionObserver = (cb, isEnd, option = {}) => {
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const loadingRef = useRef(null);
  const isLoading = useRef(false);
  const observer = useRef(null);

  const callbackRef = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading.current) {
      isLoading.current = true;
      try {
        await cb();
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.current = false;
      }
    }
  }, [cb]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      ...option
    };
    observer.current?.disconnect(); // 관찰 리셋
    if (loadingRef.current) {
      observer.current = new IntersectionObserver(callbackRef, observerOptions);  // 계속 업데이트 되긴 해야해
      observer.current.observe(loadingRef.current);
      console.log('0000')
    }
    console.log('1111')
  }, [callbackRef, option]);



  useEffect(() => {
    if (isEnd) {
      setIsScrollEnd(true);
      console.log('2222')
    }
  }, [isEnd]);

  return {
    loadingRef,
    isScrollEnd,
  };
};
