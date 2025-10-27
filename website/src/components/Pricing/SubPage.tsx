import { plans } from "./plans";
import { PlanCard } from "./PlanCard";

export default function PricingPage() {
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-gray-900 dark:text-white">

      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 dark:from-emerald-300 dark:via-violet-300 dark:to-emerald-300">
          Choose Your Plan
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-white/60">
          Flexible pricing for teams of all sizes.
        </p>
      </div>


      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
      </div>

      
      <p className="mt-6 text-center text-[11px] text-gray-500 dark:text-white/40">
        Prices in EUR. Taxes may apply.
      </p>
    </main>
  );
}

