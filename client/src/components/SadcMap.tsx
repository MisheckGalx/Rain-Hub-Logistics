import { useState } from "react";
import { MAP_COUNTRIES, MAP_ISLAND_POINTS, MAP_MIDRAND, MAP_VIEW } from "./sadcMapData";

// The 16 member states of the Southern African Development Community (sadc.int/member-states).
const road = ["Angola", "Botswana", "DR Congo", "Eswatini", "Lesotho", "Malawi", "Mozambique", "Namibia", "South Africa", "Tanzania", "Zambia", "Zimbabwe"];
const sea = ["Comoros", "Madagascar", "Mauritius", "Seychelles"];

const FILL = { other: "#16233b", road: "#3d82c6", roadHi: "#86bbf0", sea: "#9cc2e6", seaHi: "#d3e6f8" };

export default function SadcMap() {
  const [active, setActive] = useState<string | null>(null);
  // Tap/click selects (hover already selects on desktop, so a toggle would flip it straight back off).
  const select = (n: string) => setActive(n);
  // Hover only for mouse/pen. Touch has no hover, and browsers fire a stray "leave" right after a tap.
  const hover = (n: string) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType !== "touch" && setActive(n),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType !== "touch" && setActive(null),
  });

  const kindOf = (n: string) => (road.includes(n) ? "by road and cross-border trucking" : sea.includes(n) ? "by sea and air freight" : "");

  return (
    <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
      {/* Map */}
      <div className="reveal">
        <svg
          viewBox={`${MAP_VIEW.x} ${MAP_VIEW.y} ${MAP_VIEW.w} ${MAP_VIEW.h}`}
          className="mx-auto h-auto w-full max-w-[440px] md:max-w-[520px]"
          role="img"
          aria-label="Map of Africa with the 16 member states of the Southern African Development Community highlighted"
        >
          {MAP_COUNTRIES.filter((c) => c.kind === "other").map((c) => (
            <path key={c.name} d={c.d} fill={FILL.other} stroke="#0B1628" strokeWidth="1.2" />
          ))}

          {MAP_COUNTRIES.filter((c) => c.kind === "mainland").map((c) => (
            <path
              key={c.name}
              d={c.d}
              fill={active === c.name ? FILL.roadHi : FILL.road}
              stroke="#0B1628"
              strokeWidth="1.6"
              strokeLinejoin="round"
              className="cursor-pointer"
              style={{ transition: "fill 200ms" }}
              onClick={() => select(c.name)}
              {...hover(c.name)}
            />
          ))}

          {MAP_COUNTRIES.filter((c) => c.kind === "island").map((c) => (
            <path
              key={c.name}
              d={c.d}
              fill={active === c.name ? FILL.seaHi : FILL.sea}
              stroke="#0B1628"
              strokeWidth="1.2"
              className="cursor-pointer"
              style={{ transition: "fill 200ms" }}
              onClick={() => select(c.name)}
              {...hover(c.name)}
            />
          ))}

          {MAP_ISLAND_POINTS.map((p) => (
            <g key={p.name} className="cursor-pointer" onClick={() => select(p.name)} {...hover(p.name)}>
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              <circle cx={p.x} cy={p.y} r="7" fill={active === p.name ? FILL.seaHi : FILL.sea} stroke="#0B1628" strokeWidth="1.5" style={{ transition: "fill 200ms" }} />
            </g>
          ))}

          {/* Midrand hub */}
          <g>
            <circle
              cx={MAP_MIDRAND.x}
              cy={MAP_MIDRAND.y}
              r="7"
              fill="#fff"
              opacity=".55"
              className="animate-ping motion-reduce:animate-none"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle cx={MAP_MIDRAND.x} cy={MAP_MIDRAND.y} r="7" fill="#fff" stroke="#0B1628" strokeWidth="2.5" />
            <text
              x={MAP_MIDRAND.x - 16}
              y={MAP_MIDRAND.y + 7}
              textAnchor="end"
              fontSize="21"
              fontWeight="600"
              fill="#fff"
              stroke="#0B1628"
              strokeWidth="5"
              paintOrder="stroke"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Midrand
            </text>
          </g>
        </svg>

        <p className="mt-2 h-6 text-center text-sm text-white/60" aria-live="polite">
          {active ? (
            <>
              <span className="font-medium text-white">{active}</span> · {kindOf(active)}
            </>
          ) : (
            "Hover or tap a country"
          )}
        </p>
      </div>

      {/* Copy + country list */}
      <div>
        <h2 className="reveal text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">Across the whole SADC region.</h2>
        <p className="reveal mt-5 max-w-md text-[17px] leading-relaxed text-white/70" style={{ ["--d" as string]: "80ms" }}>
          Our trucks run cross-border routes through Southern Africa, dispatched from Midrand. For the island states, we arrange sea and air freight.
        </p>

        <div className="reveal mt-10 space-y-8" style={{ ["--d" as string]: "140ms" }}>
          <div>
            <p className="flex items-center gap-2.5 text-sm font-medium text-white">
              <span className="h-3 w-3 rounded-full" style={{ background: FILL.road }} />
              Road and cross-border trucking
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[15px] text-white/75">
              {road.map((n) => (
                <li key={n}>
                  <button
                    {...hover(n)}
                    onFocus={() => setActive(n)}
                    onBlur={() => setActive(null)}
                    onClick={() => select(n)}
                    className={`w-full border-t border-white/10 py-2.5 text-left transition-colors ${active === n ? "text-white" : "hover:text-white"}`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2.5 text-sm font-medium text-white">
              <span className="h-3 w-3 rounded-full" style={{ background: FILL.sea }} />
              Sea and air freight
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[15px] text-white/75">
              {sea.map((n) => (
                <li key={n}>
                  <button
                    {...hover(n)}
                    onFocus={() => setActive(n)}
                    onBlur={() => setActive(null)}
                    onClick={() => select(n)}
                    className={`w-full border-t border-white/10 py-2.5 text-left transition-colors ${active === n ? "text-white" : "hover:text-white"}`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
