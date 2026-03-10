import { useEffect, useRef } from "react";

export function useCountUp(target: number, suffix: string, trigger: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!trigger || done.current || !ref.current) return;
    done.current = true;
    let current = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        ref.current!.textContent = target + suffix;
        clearInterval(timer);
      } else {
        ref.current!.textContent = Math.floor(current) + suffix;
      }
    }, 22);
    return () => clearInterval(timer);
  }, [trigger, target, suffix]);

  return ref;
}
