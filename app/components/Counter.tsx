import { use, useEffect, useRef } from "react";

export function Counter({ value, speed }: { value: number; speed: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const currentVal = useRef(value);
  const startTime = useRef(Date.now());
  const animationRef = useRef<number>();

  const calculate = () => {
    const now = Date.now();
    const elapsedTime = now - startTime.current;
    const delta = elapsedTime / 1000 * speed;
    currentVal.current = value + delta;

    if (ref.current) {
      ref.current.textContent = currentVal.current.toFixed(2);
    }

    animationRef.current = requestAnimationFrame(calculate);
  }

  useEffect(() => {
    startTime.current = Date.now();
    animationRef.current = requestAnimationFrame(calculate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [value, speed]);

  return (
    <span ref={ref} className="tabular-nums">{currentVal.current}</span>
  )
}
