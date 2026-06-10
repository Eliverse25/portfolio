import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/content/site";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-600"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/* Ô dự án dạng LỚN nằm ngang (ảnh + chữ cạnh nhau) */
export function FeatureCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid overflow-hidden rounded-[var(--radius-base)] border border-line bg-paper-2/40 transition-colors hover:border-ink-400/50 md:grid-cols-2"
    >
      <div
        className={`relative aspect-[16/11] overflow-hidden md:aspect-auto ${
          project.coverDark ? "bg-[#0c0c0e]" : "bg-paper-2"
        }`}
      >
        <Image
          src={project.cover}
          alt={`${project.name} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority
        />
      </div>

      <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
        <div>
          <div className="flex items-center justify-between text-sm text-ink-400">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
            {project.tagline} {project.summary}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <Tags items={project.tags} />
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink-900">
            View
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Ô dự án dạng đứng (ảnh trên, chữ dưới) */
export function TileCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-base)] border border-line bg-paper-2/40 transition-colors hover:border-ink-400/50"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          project.coverDark ? "bg-[#0c0c0e]" : "bg-paper-2"
        }`}
      >
        <Image
          src={project.cover}
          alt={`${project.name} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between text-sm text-ink-400">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
            {project.tagline}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Tags items={project.tags} />
          <ArrowUpRight
            size={18}
            className="shrink-0 text-ink-400 transition-all group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-ink-900"
          />
        </div>
      </div>
    </Link>
  );
}
