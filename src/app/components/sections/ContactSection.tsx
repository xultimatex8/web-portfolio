import { Mail, FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
    value: "github.com/Ultimate88x",
    href: "https://github.com/Ultimate88x",
    icon: FaGithub,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full py-10 lg:py-20 fhd:py-30 flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-40 px-6 lg:px-15"
    >
      <h1 className="w-full lg:w-27 fhd:w-xs text-3xl lg:text-4xl 2xl:text-5xl fhd:text-6xl font-bold tracking-tight text-foreground lg:sticky">
        Contact
      </h1>

      <div className="flex-1 flex flex-col gap-6 w-full">
        <p className="text-base lg:text-xl 2xl:text-2xl text-foreground-secondary max-w-2xl">
          Feel free to reach out — I&apos;m open to new opportunities and always happy to
          connect.
        </p>

        <div className="flex flex-col gap-4">
          {CONTACT_LINKS.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 group w-fit max-w-full"
            >
              <span className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-card group-hover:bg-accent-primary transition-colors">
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-foreground group-hover:text-background transition-colors" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs 2xl:text-sm text-foreground-secondary">{label}</span>
                <span className="text-sm lg:text-base 2xl:text-lg font-medium text-foreground group-hover:text-accent-primary transition-colors truncate">
                  {value}
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href="/CV_AlejandroGonzalez_Software.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mt-4 px-4 lg:px-6 py-3 w-fit rounded-full bg-accent-primary text-sm lg:text-base text-background font-semibold hover:opacity-90 transition-opacity"
        >
          <FileDown className="w-5 h-5" />
          Open CV
        </a>
      </div>
    </section>
  );
}