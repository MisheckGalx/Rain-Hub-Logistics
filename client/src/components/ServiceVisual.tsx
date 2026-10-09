import Photo from "@/components/Photo";

/**
 * Visual for each service. Road freight and truck hire use real photos.
 * Sea, air and customs use original illustrations until you have real photos
 * (swap one in by replacing the illustration with <Photo name="..." alt="..." />).
 */

const sky = (id: string, a: string, b: string) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={a} />
    <stop offset="1" stopColor={b} />
  </linearGradient>
);

function SeaArt() {
  const rows = [
    { y: 262, xs: [150, 204, 258, 312, 366], c: ["#1c5386", "#ffffff", "#8fb4d9", "#0B1628", "#1c5386"] },
    { y: 224, xs: [176, 230, 284, 338], c: ["#ffffff", "#1c5386", "#0B1628", "#8fb4d9"] },
    { y: 186, xs: [204, 258, 312], c: ["#8fb4d9", "#ffffff", "#1c5386"] },
  ];
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a container ship at sea">
      <defs>{sky("seaSky", "#cfe2f4", "#f6f9fd")}</defs>
      <rect width="640" height="480" fill="url(#seaSky)" />
      <circle cx="505" cy="120" r="46" fill="#fff" opacity=".85" />
      <g fill="#fff" opacity=".9">
        <rect x="60" y="90" width="120" height="22" rx="11" />
        <rect x="90" y="74" width="70" height="22" rx="11" />
        <rect x="360" y="150" width="90" height="18" rx="9" />
      </g>
      <rect y="318" width="640" height="162" fill="#2a6aa6" />
      <path d="M110 300 H535 L498 354 H150 Z" fill="#0B1628" />
      <rect x="122" y="303" width="404" height="7" fill="#fff" opacity=".85" />
      {rows.map((r) =>
        r.xs.map((x, i) => (
          <g key={`${r.y}-${x}`}>
            <rect x={x} y={r.y} width="52" height="38" rx="3" fill={r.c[i]} stroke="#0B1628" strokeOpacity=".18" />
            <path d={`M${x + 13} ${r.y + 4} V${r.y + 34} M${x + 26} ${r.y + 4} V${r.y + 34} M${x + 39} ${r.y + 4} V${r.y + 34}`} stroke="#0B1628" strokeOpacity=".14" />
          </g>
        ))
      )}
      <rect x="450" y="196" width="62" height="104" rx="4" fill="#fff" />
      <rect x="440" y="186" width="82" height="14" rx="4" fill="#0B1628" />
      <rect x="458" y="214" width="46" height="8" rx="2" fill="#1c5386" />
      <rect x="458" y="232" width="46" height="8" rx="2" fill="#1c5386" opacity=".6" />
      <rect x="478" y="160" width="16" height="28" rx="3" fill="#1c5386" />
      <path d="M0 352 Q40 336 80 352 T160 352 T240 352 T320 352 T400 352 T480 352 T560 352 T640 352 V480 H0Z" fill="#1c5386" />
      <path d="M0 392 Q50 376 100 392 T200 392 T300 392 T400 392 T500 392 T600 392 T700 392 V480 H0Z" fill="#0B1628" opacity=".28" />
      <path d="M0 430 Q60 416 120 430 T240 430 T360 430 T480 430 T600 430 T720 430 V480 H0Z" fill="#fff" opacity=".12" />
    </svg>
  );
}

function AirArt() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a cargo aircraft in flight">
      <defs>{sky("airSky", "#1c5386", "#9cc2e6")}</defs>
      <rect width="640" height="480" fill="url(#airSky)" />
      <g fill="#fff" opacity=".92">
        <ellipse cx="120" cy="400" rx="110" ry="30" />
        <ellipse cx="210" cy="388" rx="70" ry="34" />
        <ellipse cx="520" cy="430" rx="130" ry="34" />
        <ellipse cx="450" cy="414" rx="70" ry="30" />
      </g>
      <g fill="#fff" opacity=".35">
        <ellipse cx="540" cy="110" rx="70" ry="16" />
        <ellipse cx="90" cy="130" rx="60" ry="14" />
      </g>
      <path d="M-10 330 C 70 322 90 300 118 268" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeDasharray="2 12" strokeLinecap="round" fill="none" />
      <g transform="rotate(-7 340 250)">
        <path d="M300 252 L246 340 L304 340 L392 258 Z" fill="#dbe7f3" />
        <ellipse cx="316" cy="306" rx="28" ry="12" fill="#b9c9db" />
        <path d="M150 240 L96 266 L136 266 L190 246 Z" fill="#dbe7f3" />
        <path d="M138 230 L106 164 L152 164 L194 226 Z" fill="#fff" />
        <path d="M122 250 Q122 224 166 222 L470 222 Q542 224 564 246 Q542 268 470 268 L166 268 Q122 268 122 250 Z" fill="#fff" />
        <path d="M146 256 H520" stroke="#1c5386" strokeWidth="6" strokeLinecap="round" />
        <path d="M498 227 L538 235 Q552 241 557 247 L498 247 Z" fill="#1c5386" opacity=".85" />
        {[200, 224, 248, 272, 296, 320, 344, 368, 392, 416, 440].map((x) => (
          <circle key={x} cx={x} cy="240" r="5" fill="#1c5386" opacity=".85" />
        ))}
        <path d="M106 164 H152" stroke="#1c5386" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CustomsArt() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of customs paperwork with an approval stamp">
      <defs>{sky("cuSky", "#dce9f6", "#f6f9fd")}</defs>
      <rect width="640" height="480" fill="url(#cuSky)" />
      <g transform="rotate(7 330 240)">
        <rect x="258" y="62" width="250" height="330" rx="18" fill="#fff" stroke="#c4d3e3" />
        <rect x="286" y="96" width="92" height="14" rx="7" fill="#1c5386" opacity=".5" />
        {[134, 160, 186].map((y, i) => (
          <rect key={y} x="286" y={y} width={190 - i * 28} height="10" rx="5" fill="#d9e2ec" />
        ))}
      </g>
      <g transform="rotate(-6 250 250)">
        <rect x="128" y="78" width="260" height="340" rx="18" fill="#fff" stroke="#c4d3e3" />
        <rect x="158" y="114" width="100" height="16" rx="8" fill="#1c5386" />
        {[156, 184, 212, 240, 268].map((y, i) => (
          <rect key={y} x="158" y={y} width={200 - (i % 3) * 36} height="11" rx="5.5" fill="#d9e2ec" />
        ))}
        <rect x="158" y="302" width="92" height="40" rx="8" fill="#eaf2fa" />
        <path d="M172 322 l12 12 l24 -26" stroke="#1c5386" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <g transform="rotate(-14 410 330)" opacity=".95">
        <circle cx="410" cy="330" r="78" fill="#fff" fillOpacity=".55" stroke="#1c5386" strokeWidth="9" />
        <circle cx="410" cy="330" r="60" fill="none" stroke="#1c5386" strokeWidth="3" />
        <path d="M376 332 l24 26 l48 -56" stroke="#1c5386" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

export default function ServiceVisual({ id, className = "" }: { id: string; className?: string }) {
  let inner: React.ReactNode;
  switch (id) {
    case "road-freight":
      inner = <Photo name="truck-road" alt="A Rain Hub truck on the roadside with the open road ahead" className="object-[72%_50%]" />;
      break;
    case "truck-hire":
      inner = <Photo name="bay-night-b" alt="The truck at the far end of a lit, covered bay at night" className="object-[50%_62%]" />;
      break;
    case "sea-freight":
      inner = <SeaArt />;
      break;
    case "air-freight":
      inner = <AirArt />;
      break;
    case "customs-clearance":
      inner = <CustomsArt />;
      break;
    default:
      return null;
  }
  return <div className={`aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#EAF2FA] ${className}`}>{inner}</div>;
}
