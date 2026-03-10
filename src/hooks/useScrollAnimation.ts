import { useEffect, useRef, useCallback } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  const check = useCallback(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".scroll-animate");
    els.forEach((el) => {
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.82) {
        el.classList.add("animated");
      }
    });
  }, []);

  useEffect(() => {
    check();
    window.addEventListener("scroll", check);
    return () => window.removeEventListener("scroll", check);
  }, [check]);

  return ref;
}
