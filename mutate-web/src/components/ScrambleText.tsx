import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  value: string;
  duration?: number;
  className?: string;
}

const CHARS = "0123456789X!#$";

export const ScrambleText = ({ value, duration = 900, className }: ScrambleTextProps) => {
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const reveal = Math.floor(progress * value.length);
      let out = "";
      for (let i = 0; i < value.length; i++) {
        const ch = value[i];
        if (i < reveal || ch === " " || ch === "," || ch === "." || ch === "/") {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress >= 1) {
        setDisplay(value);
        window.clearInterval(interval);
      }
    }, 30);
    return () => window.clearInterval(interval);
  }, [value, duration]);

  return <span className={className}>{display}</span>;
};
