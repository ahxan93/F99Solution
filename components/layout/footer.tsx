import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { footerCompany, footerLegal, footerTools } from "@/config/nav";
import { services } from "@/data/services";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";
import { CookieSettingsButton } from "./cookie-settings-button";

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display mb-4 text-sm font-semibold tracking-wide">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted hover:text-accent text-sm transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  const topServices = services
    .slice(0, 8)
    .map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

  return (
    <footer className="border-border bg-surface mt-24 border-t pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="space-y-5">
          <Logo height={44} />
          <p className="text-muted max-w-sm text-sm leading-relaxed">{siteConfig.tagline}</p>
          <NewsletterForm />
          <ul className="text-muted space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="text-accent size-4" aria-hidden="true" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-accent">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="text-accent size-4" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="text-accent size-4" aria-hidden="true" />
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {contact.address.city}, {contact.address.region}, {contact.address.country}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <WhatsappIcon className="text-accent size-4" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <div className="flex gap-2 pt-1">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="border-border hover:border-accent hover:text-accent grid size-10 place-items-center rounded-full border transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <Column title="Services" links={topServices} />
          <Column title="Company" links={footerCompany} />
          <div className="space-y-8">
            <Column title="Free Tools" links={footerTools} />
            <Column title="Legal" links={footerLegal} />
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="container-page text-muted flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <CookieSettingsButton className="hover:text-accent underline underline-offset-2" />
          <p>
            Digital marketing agency in {siteConfig.contact.address.city},{" "}
            {siteConfig.contact.address.country}
          </p>
        </div>
        {/* Credits: NASA asks to be acknowledged; the cloud layer's CC BY 4.0 licence requires attribution (see README → Credits) */}
        <p className="container-page text-muted pb-5 text-center text-[11px]">
          Earth imagery: NASA Earth Observatory (Blue Marble, Black Marble). Clouds:{" "}
          <a
            href="https://www.solarsystemscope.com/textures/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent underline underline-offset-2"
          >
            Solar System Scope
          </a>{" "}
          (
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent underline underline-offset-2"
          >
            CC BY 4.0
          </a>
          ). This site is not affiliated with or endorsed by NASA.
        </p>
      </div>
    </footer>
  );
}
