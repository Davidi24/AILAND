import Image from "next/image";
import { team } from "./team";
import CardLayout from "@/Layouts/CardLayout";


export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative mx-auto max-w-7xl px-6 py-24">

      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-violet-400 to-emerald-400 dark:from-emerald-300 dark:via-violet-300 dark:to-emerald-300 bg-clip-text text-transparent">
          Our Team
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
          Meet the people behind our semantic XR vision.
        </p>
      </div>

      {/* Cards: 5 in one line on xl */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
       {team.map((member) => (
  <CardLayout key={member.id}>
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="relative grid h-32 w-32 place-items-center rounded-full transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]">
        <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-[#3ef4c5] to-[#a78bfa] opacity-90 
        transition-shadow duration-500 ease-in-out 
        group-hover:shadow-[0_0_25px_rgba(62,244,197,0.25),0_0_35px_rgba(167,139,250,0.1)]">
          <div className="h-full w-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
            <Image
              src={member.photo}
              alt={member.name}
              width={128}
              height={128}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
        {member.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-white/60">{member.role}</p>

      {member.funFact && (
        <p className="mt-2 text-xs text-gray-500 italic dark:text-white/50">
          “{member.funFact}”
        </p>
      )}

      {(member?.social?.github || member?.social?.linkedin) && (
        <div className="mt-4 flex items-center space-x-3">
          {(member?.social?.github || member?.social?.linkedin) && (
  <div className="mt-2 flex items-center space-x-3">
    {member?.social?.github && (
     <a
  href={member.social.github}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`${member.name} on GitHub`}
  className="group/icon relative inline-flex h-9 w-9 items-center justify-center rounded-full 
             ring-1 ring-black/10 dark:ring-white/10 
             bg-white/60 dark:bg-white/10 backdrop-blur 
             transition-all duration-300
             hover:scale-110 hover:ring-emerald-400/50 dark:hover:ring-violet-400/50
             hover:shadow-[0_0_12px_rgba(62,244,197,0.45),0_0_18px_rgba(167,139,250,0.3)] 
             dark:hover:shadow-[0_0_12px_rgba(167,139,250,0.45),0_0_18px_rgba(62,244,197,0.3)]"
  title="GitHub"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-gray-800 dark:text-white 
               transition-colors duration-300 
               group-hover/icon:text-emerald-400 dark:group-hover/icon:text-violet-400"
  >
    <path
      fillRule="evenodd"
      d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53
        0-.26-.01-1.12-.02-2.04-3.06.67-3.7-1.31-3.7-1.31-.5-1.27-1.2-1.61-1.2-1.61-.98-.67.07-.66.07-.66
        1.08.08 1.64 1.11 1.64 1.11.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.7-1.45-2.44-.28-5.01-1.22-5.01-5.43
        0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.42.1-2.96 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 2.78-.37c.94 0
        1.89.13 2.78.37 2.12-1.43 3.05-1.13 3.05-1.13.59 1.54.21 2.68.1 2.96.69.77 1.11 1.75 1.11 2.95
        0 4.22-2.58 5.14-5.04 5.41.39.33.74.98.74 1.98 0 1.43-.01 2.58-.01 2.93 0 .29.2.64.76.53A10.53
        10.53 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"
      clipRule="evenodd"
    />
  </svg>
</a>

    )}

    {member?.social?.linkedin && (
      <a
        href={member.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} on LinkedIn`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-black/10 dark:ring-white/10 
                   bg-white/60 dark:bg-white/10 backdrop-blur hover:scale-105 
                   hover:ring-emerald-400/50 dark:hover:ring-violet-400/50 transition"
        title="LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-gray-800 dark:text-white"
        >
          <path d="M4.98 3.5C4.98 4.61 4.08 5.5 2.97 5.5S.97 4.61.97 3.5C.97 2.39 1.87 1.5 2.98 1.5s2 .89 2 2zM1 8h4v14H1zM8 8h4v2.09h.06c.56-1.06 1.92-2.18 3.95-2.18 4.23 0 5.01 2.79 5.01 6.42V22H17v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.68-2.49 3.42V22H8V8z" />
        </svg>
      </a>
    )}
  </div>
)}

        </div>
      )}
    </div>
  </CardLayout>
))}
      </div>
    </section>
  );
}