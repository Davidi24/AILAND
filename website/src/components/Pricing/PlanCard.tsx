import * as React from "react";

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
};

export function PlanCard({
  name,
  price,
  cadence,
  features,
  cta,
  highlighted,
  badge,
}: Plan) {
  return (
    <div
      className={
        "relative flex h-full flex-col rounded-2xl border p-5 shadow-lg transition-transform hover:-translate-y-0.5 " +
        "bg-white dark:bg-white/5 " +
        "border-gray-200 dark:border-white/10 " +
        (highlighted ? "ring-1 ring-violet-400/40" : "")
      }
    >
      {badge ? (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full 
            bg-gradient-to-r from-emerald-300 to-violet-300 
            px-2.5 py-0.5 text-[10px] font-semibold tracking-wide 
            text-black shadow-lg"
        >
          {badge}
        </span>
      ) : null}

      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
      </div>

      <div className="mb-5 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold leading-none text-gray-900 dark:text-white">
          {price}
        </span>
        {cadence ? (
          <span className="text-xs text-gray-600 dark:text-white/60">{cadence}</span>
        ) : null}
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2 text-sm text-gray-700 dark:text-white/80">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-emerald-500 dark:text-emerald-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={cta.href}
        className={
          "inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black " +
          (highlighted
            ? "text-white dark:text-black bg-gradient-to-r from-emerald-300 to-violet-300 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(16,185,129,0.7)] focus:ring-violet-400"
            : "bg-gray-900 text-white hover:bg-gray-800 dark:border dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 focus:ring-gray-300 dark:focus:ring-white/30")
        }
      >
        {cta.label}
      </a>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
