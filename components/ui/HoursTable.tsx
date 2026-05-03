import type { ShopInfo } from "@/types";

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function todayName(): string {
  return new Date().toLocaleDateString("en-GB", { weekday: "long" });
}

export default function HoursTable({ hours }: { hours: ShopInfo["hours"] }) {
  const today = todayName();
  const sorted = DAY_ORDER.map((day) => hours.find((h) => h.day === day)).filter(
    Boolean
  ) as ShopInfo["hours"];

  return (
    <table className="w-full text-left">
      <tbody>
        {sorted.map((row) => {
          const isToday = row.day === today;
          return (
            <tr
              key={row.day}
              className={`border-b border-crema last:border-0 ${isToday ? "text-espresso font-medium" : "text-stone"}`}
            >
              <td className="py-2.5 pr-6 text-small">
                {row.day}
                {isToday && (
                  <span className="ml-2 text-label text-roast">today</span>
                )}
              </td>
              <td className="py-2.5 text-small text-right">
                {row.closed ? "Closed" : `${row.open} – ${row.close}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
