"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated counter that increments from 0 to the numeric portion of `value`.
 * Supports suffixes like "+", "%", "ans", "M" appended after the number.
 *
 * @param {string|number} value  - e.g. "150+", "25ans", "98%", 42
 * @param {string}        className - Tailwind classes applied to the root span
 * @param {number}        duration  - Animation duration in ms (default 1800)
 */
export default function StatsCounter({ value, className = "", duration = 1800 }) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const raw = String(value);
    // Extract leading number and trailing suffix
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)/);

    if (!match) {
      setDisplayValue(raw);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    const decimals = isFloat ? match[1].split(".")[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            setDisplayValue(
              (isFloat ? current.toFixed(decimals) : Math.floor(current).toString()) + suffix
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(target.toFixed(decimals === 0 ? 0 : decimals) + suffix);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}
