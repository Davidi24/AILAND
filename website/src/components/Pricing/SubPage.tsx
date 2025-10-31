'use client'
import { plans } from "./plans";
import { PlanCard } from "./PlanCard";
import SectionTitle from "@/Layouts/SectionTitle";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function PricingPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <main
      id="subscription"
      className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-gray-900 dark:text-white"
    >
      <SectionTitle
        title="Choose Your Plan"
        subtitle="Find the right plan for your team with flexible options and transparent pricing."
      />

      <motion.div
        ref={ref}
        className="mt-15 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <PlanCard {...plan} />
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-center text-[11px] text-gray-500 dark:text-white/40">
        Prices in EUR. Taxes may apply.
      </p>
    </main>
  );
}
