import { plans } from "./plans";
import { PlanCard } from "./PlanCard";
import SectionTitle from "@/Layouts/SectionTitle";

export default function PricingPage() {
  return (

    <main
      id="subscription"
      className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-gray-900 dark:text-white">

      <SectionTitle
        title="Choose Your Plan"
        subtitle="Find the right plan for your team with flexible options and transparent pricing."
      />



      <div className="mt-15 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

