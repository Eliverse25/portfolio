import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { FeatureCard, TileCard } from "@/components/WorkCard";
import {
  profile,
  projects,
  process,
  services,
  awards,
} from "@/content/site";

export default function Home() {
  const feature = projects[0];
  const secondRow = projects.slice(1, 3);
  const rest = projects.slice(3);

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative mx-auto flex min-h-[92dvh] max-w-7xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-medium tracking-wide text-ink-600">
              {profile.role}, {profile.secondaryRole}
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
              Products people can
              <br />
              see, use, and{" "}
              <span className="text-accent">believe in.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-600">
              I&apos;m {profile.nickname}, a product designer with {profile.yearsExperience} years and{" "}
              {profile.projectCount} shipped products across Web3, education, and IoT.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-px active:translate-y-0"
              >
                View work
                <ArrowDown size={16} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400/60"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Cụm ảnh showreel */}
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-base)] border border-line bg-[#0c0c0e] shadow-[0_30px_80px_-40px_rgba(26,25,21,0.45)]">
              <Image
                src={feature.cover}
                alt={`${feature.name} key visual`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-[0_18px_50px_-30px_rgba(26,25,21,0.5)] sm:flex">
              <Image
                src="/brand/awwwards.png"
                alt="Awwwards"
                width={44}
                height={28}
                className="h-7 w-auto rounded"
              />
              <div className="leading-tight">
                <p className="text-sm font-medium text-ink-900">Awwwards</p>
                <p className="text-xs text-ink-400">Recognized work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ WORK ============================ */}
      <section id="work" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected work
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-600">
            A few products I shaped end to end, from first research to launch and iteration.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {/* Dự án nổi bật - ô lớn */}
          <Reveal>
            <FeatureCard project={feature} />
          </Reveal>

          {/* Hàng 2 ô */}
          <div className="grid gap-6 md:grid-cols-2">
            {secondRow.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <TileCard project={p} />
              </Reveal>
            ))}
          </div>

          {/* Các dự án còn lại */}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <TileCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section id="process" className="scroll-mt-20 border-y border-line bg-paper-2/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              From insight to launch, with intent at every step.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="border-t border-ink-900 pt-5">
                <span className="font-mono text-sm text-ink-400">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              About
            </h2>
            <p className="mt-7 text-xl leading-relaxed text-ink-900">
              {profile.tagline}
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600">
              I&apos;m {profile.name}, a {profile.role.toLowerCase()} and design team
              leader with nearly {profile.yearsExperience} years of experience.
              I move through insight, vision, design, and execution to ship work
              that is clear, considered, and genuinely useful.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {profile.yearsExperience}+
                </p>
                <p className="mt-1 text-sm text-ink-600">Years designing</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {profile.projectCount}
                </p>
                <p className="mt-1 text-sm text-ink-600">Products shipped</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {projects.length}
                </p>
                <p className="mt-1 text-sm text-ink-600">Featured here</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-10">
            <div>
              <h3 className="text-sm font-medium tracking-wide text-ink-400">
                What I do
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-ink-900"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide text-ink-400">
                Recognition
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {awards.map((a) => (
                  <li key={a.title} className="flex items-baseline justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium text-ink-900">
                        {a.title}
                        {a.count && (
                          <span className="ml-2 text-sm text-accent">{a.count}</span>
                        )}
                      </p>
                      <p className="text-sm text-ink-600">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal className="flex flex-col items-start">
            {profile.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-ink-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for freelance, from {profile.rateFrom}
              </span>
            )}
            <h2 className="mt-7 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.04] tracking-tight">
              Let&apos;s build something
              <br />
              people <span className="text-accent">believe in.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
              Have a product, a brand, or an idea that needs shaping? I&apos;d love
              to hear about it.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-base font-medium text-paper transition-transform hover:-translate-y-px active:translate-y-0"
            >
              {profile.email}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
