/**
 * ───────────────────────────────────────────────────────────────
 *  Content for Lewis Sawe's portfolio.
 *  Pulled from the personal knowledge base. Everything here is real.
 *  The "space DJ" framing is the site's creative device — all facts
 *  (roles, certs, projects, links) are accurate.
 * ───────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Lewis Sawe",
  tagline: "Cloud by day, aspiring space DJ by night",
  blurb:
    "Network & Systems Administrator and DevOps engineer from Kenya. I build and secure cloud infrastructure for a living, and I mix AWS services like tracks. This whole site runs on AWS.",
  githubUrl: "https://github.com/lewisawe",
  linkedinUrl: "https://linkedin.com/in/lewisawe",
  resumeUrl: "", // add a PDF link if you want a Resume button
};

export const about = {
  heading: "About",
  kicker: "SOUNDCHECK",
  paragraphs: [
    "I'm Lewis Sawe, a Network and Systems Administrator and DevOps engineer based in Kenya. I'm the one-person IT department at an IT solutions provider, serving SME clients like restaurants, retail shops, chemists, and bars. I assess what a client needs, design the solution, deploy it, and train their staff to use it.",
    "Before that I supported 15 independent client sites as a contractor, did a DevOps internship focused on AWS cost optimization and CI/CD, and spent three years at Kenya Red Cross in communication and COVID response. That mix is why I can explain a firewall to a shop owner and still hold my own in a build pipeline.",
    "I hold a BSc in Information Sciences from Moi University and I'm an AWS Community Builder. Off the clock I'm an aspiring space DJ. Give me a starfield and a good set and I'm happy.",
  ],
};

export const rig = {
  heading: "The Rig",
  kicker: "TECH SUPERPOWERS",
  sub: "The gear I spin with.",
  groups: [
    {
      name: "Cloud / AWS",
      items: ["AWS (6 certs)", "Amplify", "ECS Fargate", "CloudFront", "Terraform", "GCP"],
    },
    {
      name: "DevOps & Infra",
      items: ["Docker", "CI/CD", "Linux", "Kubernetes (KCNA)", "Networking (CCNA)", "Prometheus/Grafana"],
    },
    {
      name: "Security",
      items: ["AWS Security Specialty", "TryHackMe SOC L1 & L2", "HackTheBox SOC path", "Incident Response", "SIEM"],
    },
    {
      name: "Languages",
      items: ["Python", "Bash", "TypeScript", "SQL", "Go"],
    },
  ],
};

export const setlist = {
  heading: "The Set List",
  kicker: "SELECTED WORK",
  sub: "Every good set has a tracklist. Here's mine.",
  tracks: [
    {
      no: "01",
      title: "Kadi — Production URL Shortener",
      role: "MLH PRODUCTION HACKATHON WINNER · INCIDENT RESPONSE",
      desc: "Production-grade URL shortener that held a 0% error rate at 500 concurrent users with sub-40ms p95 latency. Gold on reliability, scalability, incident response, and docs.",
      link: "https://github.com/lewisawe/PE-URL-Shortner",
      tags: ["Flask", "Docker", "Grafana"],
    },
    {
      no: "02",
      title: "KPLC Sentinel",
      role: "OPENCLAW CHALLENGE WINNER",
      desc: "An agent that tracks prepaid electricity for Kenyan households: parses token SMS, predicts consumption, scrapes outage PDFs, and handles English, Swahili, and Sheng. Won the DEV OpenClaw Challenge.",
      link: "https://github.com/lewisawe/kplc-sentinel",
      tags: ["Python", "SQLite", "Agent"],
    },
    {
      no: "03",
      title: "ChamaPesa",
      role: "CYBERSECURITY · TEAM OF 6",
      desc: "A savings-group platform for Kenya with M-Pesa integration, shipped via automated CI/CD to AWS ECS Fargate. I owned the security side.",
      link: "https://github.com/lewisawe/chama",
      tags: ["TypeScript", "AWS", "Terraform"],
    },
    {
      no: "04",
      title: "AWS Bootcamp Cruddur",
      role: "FULL-STACK CLOUD-NATIVE BUILD",
      desc: "A full-stack cloud-native app built over 13 weeks and 190 commits: Flask backend, React frontend, serverless CDK, and documented architecture decisions throughout.",
      link: "https://github.com/lewisawe/aws-bootcamp-cruddur-2023",
      tags: ["Python", "React", "CDK"],
    },
    {
      no: "05",
      title: "ETL Pipeline with Bash",
      role: "DATA AUTOMATION",
      desc: "A cron-scheduled data pipeline that extracts from public datasets, transforms, and loads into PostgreSQL in about two minutes. Plain Bash, no framework.",
      link: "https://github.com/lewisawe/ETL_with_bash",
      tags: ["Bash", "PostgreSQL"],
    },
    {
      no: "06",
      title: "Guardian",
      role: "SECURITY TOOLING",
      desc: "A security monitoring and protection tool written in Python, from my ongoing SOC and blue-team work.",
      link: "https://github.com/lewisawe/Guardian-",
      tags: ["Python", "Security"],
    },
  ],
};

export const achievements = {
  heading: "Achievements",
  kicker: "ON THE RECORD",
  sub: "Wins, certs, and milestones.",
  items: [
    {
      title: "MLH Production Hackathon — Winner, Incident Response",
      meta: "2026",
      desc: "Built Kadi, a production URL shortener that took gold across reliability, scalability, incident response, and documentation.",
    },
    {
      title: "OpenClaw Challenge — Winner",
      meta: "2026",
      desc: "Won the DEV 'OpenClaw in Action' prompt with KPLC Sentinel — $200 prize, DEV++ membership, and winner badge.",
    },
    {
      title: "AWS Community Builder",
      meta: "Current",
      desc: "DevTools category. I publish AWS deep-dives and speak at community events, including AWS Summit Johannesburg 2026.",
    },
    {
      title: "6 AWS Certifications",
      meta: "2023–2026",
      desc: "Including Security Specialty, Solutions Architect, Developer, Data Engineer, CloudOps, and AI Practitioner. Plus GCP, CCNA, and CNCF KCNA.",
    },
    {
      title: "SOC & Blue-Team Training",
      meta: "2026",
      desc: "TryHackMe SOC Level 1 & 2 and the HackTheBox SOC Analyst path, with 9 security writeups published.",
    },
    {
      title: "BSc Information Sciences (IT)",
      meta: "Moi University",
      desc: "My foundation in networks, systems, and information management.",
    },
  ],
};

export const contact = {
  heading: "Transmission",
  kicker: "CONTACT",
  sub: "Open to internships, collabs, and good playlists.",
};

// Hidden "B-side" — unlocked by the Konami code. Keep these real and fun.
export const bside = {
  facts: [
    "Before cloud, I coordinated COVID-19 emergency response for a whole county at the Red Cross.",
    "I once recovered an accounting firm from ransomware in 24 hours — no ransom paid.",
    "One of my projects parses electricity-token SMS in English, Swahili, and Sheng.",
    "Two-time hackathon winner, and yes, I think incident response is genuinely fun.",
    "The hint: there was never really a space DJ. There is a cloud engineer who likes a good drop.",
  ],
};
