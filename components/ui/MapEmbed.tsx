interface MapEmbedProps {
  src: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

export default function MapEmbed({
  src,
  title = "Fallow Coffee on Google Maps",
  className = "",
  compact = false,
}: MapEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-sm ${compact ? "h-48" : "h-80 md:h-96"} ${className}`}>
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
