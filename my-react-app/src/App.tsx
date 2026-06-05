import { useState, useEffect, useRef, FC, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Database,
  Server,
  Code2,
  Cloud,
  Shield,
  Zap,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Terminal,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Check,
  LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  icon: LucideIcon;
  title: string;
  desc: string;
  stack: string[];
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Project {
  title: string;
  desc: string;
  tags: string[];
  img: string;
  accent: "cyan" | "purple" | "teal";
}

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

interface GlowOrbProps {
  className: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = ["Home", "Skills", "Projects", "Contact"];

const SKILLS: Skill[] = [
  {
    icon: Database,
    title: "Database Design",
    desc: "Architecting scalable, high-performance data systems",
    stack: ["PostgreSQL", "Redis", "MongoDB", "Cassandra"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Server,
    title: "Server Architecture",
    desc: "Building resilient, distributed backend systems",
    stack: ["Node.js", "Go", "Kubernetes", "Docker"],
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Code2,
    title: "API Development",
    desc: "Crafting clean, documented, versioned APIs",
    stack: ["REST", "GraphQL", "gRPC", "WebSockets"],
    color: "from-cyan-400 to-teal-500",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    desc: "Deploying and scaling cloud-native solutions",
    stack: ["AWS", "GCP", "Terraform", "Serverless"],
    color: "from-blue-400 to-violet-500",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Implementing zero-trust security architectures",
    stack: ["OAuth2", "JWT", "Vault", "SAST"],
    color: "from-emerald-400 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Optimizing for sub-millisecond response times",
    stack: ["Profiling", "Caching", "CDN", "Load Testing"],
    color: "from-yellow-400 to-orange-500",
  },
];

const STATS: Stat[] = [
  { value: "6+", label: "Years Experience" },
  { value: "120+", label: "Projects Completed" },
  { value: "2.4K+", label: "API Endpoints Built" },
  { value: "99.97%", label: "Average Uptime" },
];

const PROJECTS: Project[] = [
  {
    title: "Real-time Chat API",
    desc: "A high-throughput messaging backend supporting 50K concurrent connections with end-to-end encryption, message persistence, and delivery receipts.",
    tags: ["Node.js", "WebSockets", "Redis", "PostgreSQL", "Docker"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    accent: "cyan",
  },
  {
    title: "Microservices Platform",
    desc: "Event-driven microservices architecture with service mesh, distributed tracing, automated failover, and zero-downtime deployments across 12 services.",
    tags: ["Go", "Kubernetes", "Kafka", "Istio", "Prometheus"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    accent: "purple",
  },
  {
    title: "GraphQL Analytics Engine",
    desc: "Real-time analytics platform processing 5M events/day with complex aggregations, custom dashboards, and sub-100ms query response times.",
    tags: ["GraphQL", "ClickHouse", "Rust", "TimescaleDB", "AWS"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    accent: "teal",
  },
];

const CONTACT_INFO: ContactInfo[] = [
  { icon: Mail, label: "Email", value: "alex@devcraft.io" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#contact", label: "Email" },
];

const CODE_LINES: string[] = [
  "// GraphQL Resolver — Real-time Analytics",
  "async function queryMetrics(args, ctx) {",
  "  const { timeRange, filters } = args;",
  "  ",
  "  const pipeline = await Pipeline",
  "    .aggregate([",
  "      { $match: buildFilter(filters) },",
  "      { $group: { ",
  "        _id: '$eventType',",
  "        count: { $sum: 1 },",
  "        avg_latency: { $avg: '$ms' }",
  "      }},",
  "      { $sort: { count: -1 } }",
  "    ])",
  "    .cache(timeRange.granularity);",
  "",
  "  return pipeline.map(normalizeMetric);",
  "}",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

// ─── Shared Components ────────────────────────────────────────────────────────

const FadeIn: FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlowOrb: FC<GlowOrbProps> = ({ className }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
  />
);

const GridBg: FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    />
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar: FC = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Terminal size={16} className="text-white" />
          </div>
          <span className="font-mono font-bold text-white text-lg tracking-tight">
            <span className="text-cyan-400">&lt;</span>
            dev
            <span className="text-violet-400">/&gt;</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors duration-200 tracking-wide"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/10 px-6 pb-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors border-b border-slate-800/50"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 block text-center px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function highlightCode(line: string): string {
  return line
    .replace(/\/\/.*/g, (m) => `<span class="text-slate-500">${m}</span>`)
    .replace(
      /\b(async|function|const|await|return)\b/g,
      `<span class="text-violet-400">$1</span>`
    )
    .replace(
      /\b(Pipeline|buildFilter|normalizeMetric)\b/g,
      `<span class="text-cyan-300">$1</span>`
    )
    .replace(
      /(['"`][^'"`]*['"`])/g,
      `<span class="text-emerald-400">$1</span>`
    )
    .replace(
      /\b(\$match|\$group|\$sort|\$sum|\$avg)\b/g,
      `<span class="text-yellow-400">$1</span>`
    );
}

const Hero: FC = () => {
  const [typedLine, setTypedLine] = useState<number>(0);

  useEffect(() => {
    if (typedLine < CODE_LINES.length) {
      const t = setTimeout(() => setTypedLine((v) => v + 1), 160);
      return () => clearTimeout(t);
    }
  }, [typedLine]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16"
    >
      <GridBg />
      <GlowOrb className="w-[600px] h-[600px] bg-cyan-500 -top-32 -left-32" />
      <GlowOrb className="w-[500px] h-[500px] bg-violet-600 -bottom-32 -right-16" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6"
          >
            Backend
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Architect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md"
          >
            Building the invisible infrastructure that powers modern
            applications — scalable APIs, distributed systems, and cloud-native
            architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(6,182,212,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              Get in Touch <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-colors flex items-center gap-2"
            >
              View Work <ChevronRight size={16} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4"
          >
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/50"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-cyan-500/10"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            }}
          >
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs font-mono text-slate-500">
                analytics.resolver.ts
              </span>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-sm leading-7 min-h-[300px]">
              {CODE_LINES.slice(0, typedLine).map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-slate-600 select-none w-8 shrink-0 text-right pr-4">
                    {i + 1}
                  </span>
                  <span
                    className="text-slate-300"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  />
                  {i === typedLine - 1 && typedLine < CODE_LINES.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 mt-1"
                    />
                  )}
                </div>
              ))}
            </div>

            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 60px rgba(6,182,212,0.05)" }}
            />
          </div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-slate-900 border border-violet-500/30 text-xs font-mono text-violet-400 shadow-lg shadow-violet-500/10"
          >
            <span className="text-slate-500">latency:</span> 42ms
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-lg shadow-cyan-500/10"
          >
            <span className="text-slate-500">uptime:</span> 99.97%
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Skills ───────────────────────────────────────────────────────────────────

const Skills: FC = () => (
  <section
    id="skills"
    className="relative py-28 bg-slate-900 overflow-hidden"
  >
    <GridBg />
    <GlowOrb className="w-96 h-96 bg-violet-600 top-0 right-0" />

    <div className="relative max-w-6xl mx-auto px-6">
      <FadeIn className="text-center mb-16">
        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
          What I Do
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Technical{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Expertise
          </span>
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {SKILLS.map((skill, i) => (
          <FadeIn key={skill.title} delay={i * 0.08}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 20px 60px rgba(6,182,212,0.1)",
              }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group h-full"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <skill.icon size={20} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {skill.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {skill.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 text-xs font-mono border border-slate-600/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* Stats */}
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 text-center"
            >
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────

type AccentMap = Record<Project["accent"], string>;

const Projects: FC = () => {
  const accentBorder: AccentMap = {
    cyan: "border-cyan-500/40 shadow-cyan-500/10",
    purple: "border-violet-500/40 shadow-violet-500/10",
    teal: "border-teal-500/40 shadow-teal-500/10",
  };

  const accentTag: AccentMap = {
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    purple: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    teal: "bg-teal-500/10 text-teal-300 border-teal-500/20",
  };

  return (
    <section
      id="projects"
      className="relative py-28 bg-slate-950 overflow-hidden"
    >
      <GridBg />
      <GlowOrb className="w-96 h-96 bg-cyan-500 bottom-0 left-0" />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Recent{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {PROJECTS.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className={`rounded-2xl overflow-hidden border bg-slate-900/60 backdrop-blur-sm shadow-xl ${accentBorder[proj.accent]} grid md:grid-cols-5 group`}
              >
                <div className="md:col-span-2 h-52 md:h-auto overflow-hidden">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                  />
                </div>
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-3">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-5">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${accentTag[proj.accent]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                    >
                      <Github size={15} /> Code
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact: FC = () => {
  const [sent, setSent] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (): void => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-slate-900 overflow-hidden"
    >
      <GridBg />
      <GlowOrb className="w-96 h-96 bg-violet-600 top-0 left-1/4" />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            Let's Work Together
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info Column */}
          <FadeIn direction="right">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </div>

              <p className="text-slate-400 text-lg leading-relaxed">
                Have a complex backend problem to solve? Looking to scale your
                infrastructure? I'd love to hear about your project.
              </p>

              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
                      <Icon size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-mono">
                        {label}
                      </p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors bg-slate-800/50"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form Column */}
          <FadeIn direction="left" delay={0.1}>
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm space-y-5">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-slate-400 text-sm mb-2 font-mono capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field]: e.target.value }))
                    }
                    placeholder={
                      field === "name" ? "John Doe" : "john@example.com"
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-slate-600 text-sm transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-slate-400 text-sm mb-2 font-mono">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-slate-600 text-sm transition-colors resize-none"
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(6,182,212,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <Check size={18} /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <ArrowUpRight size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: FC = () => (
  <footer className="bg-slate-950 border-t border-slate-800/50 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Terminal size={16} className="text-white" />
            </div>
            <span className="font-mono font-bold text-white text-lg">
              <span className="text-cyan-400">&lt;</span>
              dev
              <span className="text-violet-400">/&gt;</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Building the infrastructure that powers the next generation of
            applications.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Quick Links
          </h4>
          <div className="space-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="block text-slate-500 hover:text-cyan-400 text-sm transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Connect
          </h4>
          <div className="flex gap-3">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                aria-label="Social link"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-lg border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
        <span>© 2024 Alex Chen. All rights reserved.</span>
        <span className="font-mono text-xs">Built with precision & ☕</span>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App(): JSX.Element {
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #020617; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}