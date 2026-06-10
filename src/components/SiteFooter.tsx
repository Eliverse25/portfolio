import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { profile, socials } from "@/content/site";

export function SiteFooter() {
  const year = "2026"; // cập nhật năm nếu cần

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              {profile.nickname}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
              {profile.role} based in {profile.location}. Open for select freelance work.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {socials
              .filter((s) => s.href && s.href !== "#")
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-ink-600 transition-colors hover:text-ink-900"
                >
                  {s.label}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
                  />
                </a>
              ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <a href={`mailto:${profile.email}`} className="hover:text-ink-900">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
