import { useEffect, useRef } from "react";

export default function Particles({ count = 18 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = (Math.random() * 5 + 4).toFixed(1);
      const opacity = (Math.random() * 0.22 + 0.06).toFixed(2);
      const left = (Math.random() * 100).toFixed(1) + "%";
      const top = (Math.random() * 100).toFixed(1) + "%";
      const dur = (Math.random() * 10 + 6).toFixed(1) + "s";
      p.style.cssText = `width:${size}px;height:${size}px;background:rgba(87,196,229,${opacity});left:${left};top:${top};animation:floatMol ${dur} ease-in-out infinite alternate;position:absolute;border-radius:50%`;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, [count]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}
