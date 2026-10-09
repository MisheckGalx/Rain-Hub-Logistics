import { useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";

export type Slide = { name: string; alt: string; position?: string };

/**
 * Photos that slide sideways behind whatever you put inside (children).
 * - Auto-advances, pauses on hover, swipes on touch, dots to jump.
 * - Slides sit in a ring, so after the last photo the first one slides in from the right (no rewind).
 * - Respects "reduce motion": no auto-advance for people who ask their device for less movement.
 */
export default function Slideshow({
  slides,
  interval = 5500,
  className = "",
  children,
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const startX = useRef<number | null>(null);

  // signed distance of slide k from the current slide, wrapped to the shortest way round
  const signed = (k: number, cur: number) => {
    const half = Math.floor(n / 2);
    return ((k - cur + n + half) % n) - half;
  };
  const prevD = useRef<number[]>(slides.map((_, k) => signed(k, 0)));
  const ds = slides.map((_, k) => signed(k, i));
  useEffect(() => {
    prevD.current = ds;
  });

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [paused, reduce, n, interval, i]);

  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <section
      className={`relative isolate overflow-hidden bg-[#0B1628] ${className}`}
      aria-roledescription="carousel"
      aria-label="Photos of Rain Hub Logistics"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {slides.map((s, k) => {
        const wrapped = Math.abs(ds[k] - prevD.current[k]) > n / 2;
        return (
          <div
            key={s.name}
            className="absolute inset-0 -z-20 h-full w-full"
            aria-hidden={k !== i}
            style={{
              transform: `translateX(${ds[k] * 100}%)`,
              transition: wrapped || reduce ? "none" : "transform 1000ms cubic-bezier(.65,0,.35,1)",
            }}
          >
            <Photo name={s.name} alt={s.alt} className={s.position ?? ""} priority={k === 0} />
          </div>
        );
      })}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1628]/85 via-[#0B1628]/35 to-[#0B1628]/10" />

      {children}

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-6">
            {slides.map((s, k) => (
              <button
                key={s.name}
                onClick={() => setI(k)}
                aria-label={`Show photo ${k + 1} of ${n}`}
                aria-current={k === i}
                className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
