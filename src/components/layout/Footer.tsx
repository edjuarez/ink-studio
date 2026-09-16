import { ArrowUpRight } from "lucide-react";
import { contentData } from "../../data/data";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900/15 bg-[#E8E8E8] text-neutral-900">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2fr_0.5fr_0.7fr_1fr] lg:gap-16">
          
          {/* Logo + description */}
          <div className="flex flex-col items-start gap-3">
            <a
              href="/"
              className="grenze-gotisch-regular text-5xl leading-none transition-opacity hover:opacity-60"
            >
              {contentData.site.name}
            </a>
            <span className="mt-1 md:text-[1rem] text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-500">
            {contentData.site.tagline}
             </span>

            <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-600">
              {contentData.sections.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {contentData.sections.footer.navTitle}
            </p>

            <nav className="flex flex-col items-start gap-3 text-sm">
              {contentData.navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="transition-opacity hover:opacity-50"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Policies */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {contentData.sections.footer.policiesTitle}
            </p>

            <nav className="flex flex-col items-start gap-3 text-sm">
              {contentData.sections.footer.policies.map((policy) => (
                <a
                  key={policy.href}
                  href={policy.href}
                  className="transition-opacity hover:opacity-50"
                >
                  {policy.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Information */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {contentData.sections.footer.infoTitle}
            </p>

            <div className="flex flex-col gap-3 text-sm text-neutral-700">
              <a
                href={`tel:${contentData.userData.phoneRaw}`}
                className="transition-opacity hover:opacity-50"
              >
                {contentData.userData.phone}
              </a>

              <p>{contentData.userData.location}</p>

              <p>
                {contentData.userData.schedule.days}
                <br />
                {contentData.userData.schedule.hours}
              </p>

              <a
                href={`mailto:${contentData.userData.email}`}
                className="transition-opacity hover:opacity-50"
              >
                {contentData.userData.email}
              </a>

              <a
                href={contentData.userData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-2 transition-opacity hover:opacity-50"
              >
                {contentData.buttons.instagram}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-3 border-t border-neutral-900/15 pt-6 text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {contentData.sections.footer.copyright(new Date().getFullYear())}
          </p>

          <a
            href="#"
            className="transition-opacity hover:opacity-60"
          >
            {contentData.sections.footer.credit}
          </a>
        </div>
      </div>
    </footer>
  );
}