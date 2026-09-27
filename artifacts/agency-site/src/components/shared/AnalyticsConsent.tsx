import { useState } from "react";
import { Link } from "wouter";
import { analyticsConsent, setAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => analyticsConsent());
  if (choice) return null;

  const choose = (value: "granted" | "denied") => {
    setAnalyticsConsent(value);
    setChoice(value);
  };

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-background p-4 shadow-2xl sm:flex sm:items-center sm:gap-5"
      role="dialog"
      aria-label="Analytics preference"
    >
      <p className="flex-1 text-sm leading-6 text-muted-foreground">
        We use optional analytics to understand which pages and calls to action
        are useful. No analytics loads until you accept.{" "}
        <Link href="/privacy" className="font-medium text-primary underline">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
