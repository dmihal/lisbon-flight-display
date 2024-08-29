import { use, useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  speed?: number;
  minutes?: boolean;
}

function formatTime(val: number) {
  const seconds = Math.abs(Math.floor(val % 1 * 60));
  return `${val.toFixed(0)}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function Counter({ value, speed, minutes }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const currentVal = useRef(value);
  const startTime = useRef(Date.now());
  const animationRef = useRef<number>();

  const _speed = minutes ? 1 / 60 : 1;
  const formatValue = minutes ? (val: number) => formatTime(val) : (val: number) => val.toFixed(2);

  const calculate = () => {
    const now = Date.now();
    const elapsedTime = now - startTime.current;
    const delta = elapsedTime / 1000 * _speed;
    currentVal.current = value + delta;

    if (ref.current) {
      ref.current.textContent = formatValue(currentVal.current);
    }

    animationRef.current = requestAnimationFrame(calculate);
  }

  useEffect(() => {
    startTime.current = Date.now();
    animationRef.current = requestAnimationFrame(calculate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [value, speed]);

  return (
    <span ref={ref} className="tabular-nums">{formatValue(currentVal.current)}</span>
  )
}
