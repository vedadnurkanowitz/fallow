"use client";

import { useState, useEffect } from "react";
import type { DayHours } from "@/types";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function computeStatus(hours: DayHours[]): { open: boolean; label: string } {
  const now = new Date();
  const today = DAY_NAMES[now.getDay()];
  const todayHours = hours.find((h) => h.day === today);

  if (!todayHours || todayHours.closed) {
    return { open: false, label: "Closed today" };
  }

  const [openH, openM] = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;

  if (nowMins >= openMins && nowMins < closeMins) {
    return { open: true, label: `Open · Closes ${todayHours.close}` };
  }
  if (nowMins < openMins) {
    return { open: false, label: `Opens ${todayHours.open}` };
  }
  return { open: false, label: "Closed · Opens tomorrow" };
}

interface HoursStatusProps {
  hours: DayHours[];
  className?: string;
  /** Compact mode shows just the dot + "Open"/"Closed" — used in the Nav */
  compact?: boolean;
}

export default function HoursStatus({ hours, className = "", compact = false }: HoursStatusProps) {
  const [status, setStatus] = useState(() => computeStatus(hours));

  // Recalculate every minute so the badge stays accurate client-side.
  useEffect(() => {
    const id = setInterval(() => setStatus(computeStatus(hours)), 60_000);
    return () => clearInterval(id);
  }, [hours]);

  const label = compact ? (status.open ? "Open" : "Closed") : status.label;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
          status.open ? "bg-herb" : "bg-stone"
        }`}
        aria-hidden="true"
      />
      <span className="text-small text-stone">{label}</span>
    </div>
  );
}
