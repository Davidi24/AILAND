import { team } from "./team";
import { TeamCard } from "./TeamCard";

export default function TeamSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 dark:from-emerald-300 dark:via-violet-300 dark:to-emerald-300 bg-clip-text text-transparent">
          Our Team
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
          Meet the minds building semantic XR experiences.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.map((m) => (
          <TeamCard key={m.id} {...m} />
        ))}
      </div>
    </section>
  );
}
// import { team } from "./team";
// import { TeamCard } from "./TeamCard";

// export default function TeamSection() {
//   return (
//     <section className="relative mx-auto max-w-7xl px-8 py-24">
//       {/* Heading */}
//       <div className="text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 dark:from-emerald-300 dark:via-violet-300 dark:to-emerald-300 bg-clip-text text-transparent">
//           Our Team
//         </h2>
//         <p className="mt-4 text-base text-gray-600 dark:text-white/70">
//           Meet the minds building semantic XR experiences.
//         </p>
//       </div>

//       {/* Team layout */}
//       <div className="mt-16 flex flex-col items-center gap-20">
//         {/* Top row: 3 cards */}
//         <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
//           {team.slice(0, 3).map((m) => (
//             <div key={m.id} className="w-[260px]">
//               <TeamCard {...m} />
//             </div>
//           ))}
//         </div>

//         {/* Bottom row: 2 cards centered below */}
//         <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
//           {team.slice(3).map((m) => (
//             <div key={m.id} className="w-[260px]">
//               <TeamCard {...m} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
