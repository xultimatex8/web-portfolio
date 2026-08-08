import { Mail, FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "alegonzmac@gmail.com",
    href: "mailto:alegonzmac@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alejandro-gonzalez-macias-agm",
    href: "https://linkedin.com/in/alejandro-gonzalez-macias-agm",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    value: "github.com/xultimatex8",
    href: "https://github.com/xultimatex8",
    icon: FaGithub,
  },
];

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      className="relative w-full py-10 lg:py-16 flex flex-col gap-6 px-5 md:px-15"
    >
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-sm bg-accent-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
      </div>

      <p className="text-base md:text-lg text-foreground-secondary max-w-2xl">
        {t("intro")}
      </p>

      <div className="flex flex-col max-w-md">
        {CONTACT_LINKS.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 py-2.5 border-b border-foreground/10 last:border-b-0"
          >
            <Icon className="w-4 h-4 shrink-0 text-foreground-secondary group-hover:text-accent-primary transition-colors" />
            <span className="text-xs w-16 shrink-0 text-foreground-secondary">
              {label}
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-accent-primary transition-colors truncate">
              {value}
            </span>
          </a>
        ))}
      </div>

      <a
        href={t("cvUrl")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-2 px-4 py-2 w-fit rounded-full bg-accent-primary text-sm text-background font-semibold hover:opacity-90 transition-opacity"
      >
        <FileDown className="w-4 h-4" />
        {t("cv")}
      </a>
    </section>
  );
}