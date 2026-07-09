import React, { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () => typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const formatNumber = (n) => Math.round(n).toLocaleString('en-US');

// Animated number that counts up from 0 -> value the first time it scrolls
// into view. Falls back to the final value immediately when the user prefers
// reduced motion. No external dependencies (works on React 17).
const StatCounter = ({ value = 0, suffix = '', label = '', duration = 2000 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }

    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3; // easeOutCubic
        setDisplay(eased * value);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div className="app__stat-counter app__flex" ref={ref}>
      <p className="app__stat-number">
        {formatNumber(display)}
        <span>{suffix}</span>
      </p>
      <p className="p-text app__stat-label">{label}</p>
    </div>
  );
};

export default StatCounter;
