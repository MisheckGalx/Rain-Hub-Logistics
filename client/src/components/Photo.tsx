import { PHOTO_WIDTH } from "./photoMeta";

/**
 * A photo from /public/images/photos. Phones get a 640px version, bigger screens the full one,
 * in WebP with a JPEG fallback. Size it with the parent's height/aspect.
 */
export default function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 66vw, 100vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const w = PHOTO_WIDTH[name] ?? 1280;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/photos/${name}-sm.webp 640w, /images/photos/${name}.webp ${w}w`}
        sizes={sizes}
      />
      <img
        src={`/images/photos/${name}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
