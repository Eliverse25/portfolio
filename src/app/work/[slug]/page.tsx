import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { projects, getProject } from "@/content/site";

// Tạo sẵn 1 trang tĩnh cho mỗi dự án (bắt buộc khi export tĩnh).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} - ${project.category}`,
    description: project.summary,
    openGraph: {
      title: `${project.name} - ${project.category}`,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28">
      {/* Quay lại */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-ink-900"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-px" />
          All work
        </Link>
      </div>

      {/* Tiêu đề */}
      <header className="mx-auto max-w-5xl px-5 pt-10 sm:px-8 sm:pt-14">
        <p className="text-sm font-medium tracking-wide text-ink-600">
          {project.category}
        </p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-tight">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-900">
          {project.tagline}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-7 sm:grid-cols-4">
          <div>
            <dt className="text-sm text-ink-400">Role</dt>
            <dd className="mt-1 text-[15px] text-ink-900">{project.role}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-400">Year</dt>
            <dd className="mt-1 text-[15px] text-ink-900">{project.year}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-400">Focus</dt>
            <dd className="mt-1 text-[15px] text-ink-900">{project.tags.join(", ")}</dd>
          </div>
          {project.link && (
            <div>
              <dt className="text-sm text-ink-400">Link</dt>
              <dd className="mt-1">
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-[15px] text-accent"
                >
                  {project.link.label}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {/* Tổng quan + đóng góp */}
      <section className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="text-sm font-medium tracking-wide text-ink-400">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-900">
              {project.summary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-sm font-medium tracking-wide text-ink-400">
              What I did
            </h2>
            <ul className="mt-4 space-y-3">
              {project.contribution.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink-900">
                  <span className="mt-2 h-px w-4 shrink-0 bg-ink-400" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Thư viện ảnh */}
      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-24 sm:px-8">
        <div className="flex flex-col gap-6 sm:gap-10">
          {project.gallery.map((shot, i) => (
            <Reveal key={shot.src} delay={i === 0 ? 0 : 0.05}>
              <figure>
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-base)] border border-line ${
                    shot.dark ? "bg-[#0c0c0e]" : "bg-paper-2"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain p-3 sm:p-6"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-600">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Dự án tiếp theo */}
      <section className="mt-24 border-t border-line sm:mt-32">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-12 sm:px-8 sm:py-16"
        >
          <div>
            <p className="text-sm text-ink-400">Next project</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {next.name}
            </p>
          </div>
          <ArrowRight
            size={32}
            className="shrink-0 text-ink-400 transition-all group-hover:translate-x-1 group-hover:text-ink-900"
          />
        </Link>
      </section>
    </article>
  );
}
