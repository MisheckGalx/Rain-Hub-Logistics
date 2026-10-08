/** A photo from /public/images/photos with a WebP version and a JPEG fallback. Size it with the parent's height/aspect. */
export default function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source srcSet={`/images/photos/${name}.webp`} type="image/webp" />
      <img
        src={`/images/photos/${name}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
