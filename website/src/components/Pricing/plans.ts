import type { Plan } from "./PlanCard";

export const plans: Plan[] = [
  {
    name: "Free",
    price: "€0",
    cadence: "/month",
    cta: { label: "Get Started", href: "/signup" },
    features: [
      "Upload small KGs (100 nodes)",
      "Basic AR exploration",
      "Node selection & expansion",
      "Web-based access",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€99",
    cadence: "/month",
    cta: { label: "Start Pro Trial", href: "/checkout" },
    features: [
      "Larger knowledge graphs",
      "Semantic filters & search",
      "Live Wikidata/DBpedia queries",
      "Export screenshots & subgraphs",
      "Priority support",
      "Advanced layouts",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    cta: { label: "Contact Sales", href: "/contact" },
    features: [
      "Multi-user collaboration",
      "Storytelling mode",
      "On-premise deployment",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantees",
    ],
    highlighted: false,
  },
];
