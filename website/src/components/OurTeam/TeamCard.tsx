import * as React from "react";

type Social = {
  github?: string;
  linkedin?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  funFact: string;
  photo: string;
  verified?: boolean;
  social?: Social;
};

export function TeamCard({
  name,
  role,
  funFact,
  photo,
  verified,
  social,
}: TeamMember) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white/5 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
      {/* Photo */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

     
        <div
        className="
            pointer-events-none absolute inset-x-0 bottom-0 h-[50%]
            backdrop-blur-[12px] backdrop-saturate-150
            [background:linear-gradient(to_top,
            rgba(255,255,255,0.45)_0%,
            rgba(255,255,255,0.22)_28%,
            rgba(255,255,255,0.10)_45%,
            rgba(255,255,255,0)_55%)]
            dark:[background:linear-gradient(to_top,
            rgba(0,0,0,0.28)_0%,
            rgba(0,0,0,0.16)_28%,
            rgba(0,0,0,0.08)_45%,
            rgba(0,0,0,0)_55%)]
            [mask-image:linear-gradient(to_top,black_0%,black_40%,transparent_90%)]
            [mask-repeat:no-repeat] [mask-size:100%_100%]
        "
        />

        
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Text block */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-white text-xl font-semibold drop-shadow">
            {name}
          </h3>
          {verified && (
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px] font-bold"
              title="Verified"
            >
              ✓
            </span>
          )}
        </div>

        {role && <p className="mt-1 text-sm text-white/80">{role}</p>}

        <p className="mt-2 text-sm text-white/90">{funFact}</p>

        <div className="mt-4 flex items-center justify-center gap-5">
          {social?.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on GitHub`}
              className="rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 transition"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          )}
          {social?.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 transition"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.35-1.79-1.35-1.79-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.55.12-3.22 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0C17.18 3.9 18.2 4.21 18.2 4.21c.66 1.67.24 2.91.12 3.22.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.23v3.31c0 .33.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V24h-4V8Zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.87-2.77 3.82V24h-4V8Z" />
    </svg>
  );
}
