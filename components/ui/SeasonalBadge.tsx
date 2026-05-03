import Badge from "./Badge";

export default function SeasonalBadge({ className = "" }: { className?: string }) {
  return (
    <Badge variant="seasonal" className={className}>
      Seasonal
    </Badge>
  );
}
