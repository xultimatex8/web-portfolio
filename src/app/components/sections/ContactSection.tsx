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
      className="relative w-full py-20 fhd:py-30 flex items-start justify-start gap-40 px-15"
    >
      <h1 className="w-27 fhd:w-xs text-4xl fhd:text-6xl font-bold tracking-tight text-foreground sticky top-30">
        Contact
      </h1>

      <div className="flex-1 flex flex-col gap-6">
        <p className="text-xl fhd:text-2xl text-foreground-secondary max-w-2xl">
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
              className="flex items-center gap-4 group w-fit"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-card group-hover:bg-accent-primary transition-colors">
                <Icon className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs fhd:text-sm text-foreground-secondary">{label}</span>
                <span className="text-base fhd:text-lg font-medium text-foreground group-hover:text-accent-primary transition-colors">
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
          className="flex items-center gap-3 mt-4 px-4 fhd:px-6 py-3 w-fit rounded-full bg-accent-primary text-sm fhd:text-base text-background font-semibold hover:opacity-90 transition-opacity"
        >
          <FileDown className="w-5 h-5" />
          Open CV
        </a>
      </div>
    </section>
  );
}