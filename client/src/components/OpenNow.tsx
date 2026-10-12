import { useEffect, useState } from "react";
import { openStatus } from "@/lib/company";

/** "Open now · closes 18:00" in South African time, refreshed every minute. */
export default function OpenNow({ className = "" }: { className?: string }) {
  const [s, setS] = useState(() => openStatus());
  useEffect(() => {
    const t = setInterval(() => setS(openStatus()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`h-2 w-2 rounded-full ${s.open ? "bg-[#34c759]" : "bg-[#8e8e93]"}`} aria-hidden="true" />
      {s.text}
    </span>
  );
}
