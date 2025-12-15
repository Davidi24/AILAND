import type { TeamMember } from "./TeamCard";

export const team: TeamMember[] = [
  {
    id: "klea",
    name: "Klea Haxhiu",
    role: "Software Engineer",
    funFact: "I build tools where ‘it works on my machine’ becomes ‘it works everywhere.’",
    photo: "/team/kl.jpg",
    verified: true,
    social: {
      github: "https://github.com/hklea",
      linkedin: "https://www.linkedin.com/in/klea-haxhiu-90218a257/",
    },
  },
    {
    id: "era",
    name: "Erisa Zaimi",
    role: "UI/UX Designer & Frontend Developer",
    funFact: "I turn “why doesn’t this work?” into “I meant to do that.”",
    photo: "/team/erap.png",
    social: {
      github: "https://github.com/ezaimi",
      linkedin: " https://www.linkedin.com/in/erisazaimi/ ",
    },
  },
  {
    id: "david",
    name: "David Keçi",
    role: "Full Stack Developer",
    funFact: "I code by day and fix the bugs I created by night and call it part of the plan.",
    photo: "/team/david.jpg",
    social: {
      github: "https://github.com/Davidi24 ",
      linkedin: " https://www.linkedin.com/in/david-keci-917712274/",
    },
  },
  {
    id: "tamanna",
    name: "Tammanna Rahman",
    role: "Software Engineer & Researcher",
    funFact: "Turning research into real-world software.",
    photo: "/team/Tamannaa.png",
    social: {
      github: " https://github.com/TechDeitySpark ",
      linkedin: "https://www.linkedin.com/in/tamanna-rahman-diu/",
    },
  },
  {
    id: "qasim",
    name: "Qasim Abdullah",
    role: "Frontend Engineer",
    funFact: "Code fuels me like coffee — one bug at a time. Create bugs and hunt them down.",
    photo: "/team/qasim.png",
    social: {
      github: "https://github.com/Qasim-Abdullah",
      linkedin: "http://www.linkedin.com/in/qasim-abdullah",
    },
  },
];
