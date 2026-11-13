"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/config/nav";
import type { ServiceNav } from "@/lib/service-nav";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar({ nav }: { nav: ServiceNav }) {
  const { categories: serviceCategories, items: services } = nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes menus; outside click closes the mega menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };
  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || megaOpen || mobileOpen ? "nav-solid border-b" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between md:h-20"
      >
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <div
            ref={menuRef}
            onMouseEnter={openMega}
            onMouseLeave={closeMegaSoon}
            className="relative"
          >
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls="services-mega-menu"
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                "hover:text-accent flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive("/services") && "text-accent",
              )}
            >
              Services
              <ChevronDown
                className={cn("size-4 transition-transform", megaOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {/* CSS enter animation (no animation library in the navbar, which loads on every page) */}
            <>
              {megaOpen && (
                <div
                  id="services-mega-menu"
                  className="animate-menu-in bg-surface border-border fixed top-[4.75rem] left-1/2 w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 rounded-3xl border p-6 shadow-2xl"
                >
                  <div className="grid grid-cols-4 gap-6">
                    {serviceCategories.map((cat) => (
                      <div key={cat}>
                        <p className="text-muted mb-3 text-xs font-semibold tracking-widest uppercase">
                          {cat}
                        </p>
                        <ul className="space-y-1">
                          {services
                            .filter((s) => s.category === cat)
                            .map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  onClick={closeAll}
                                  className="hover:bg-surface-2 group flex items-start gap-3 rounded-xl p-2.5 transition-colors"
                                >
                                  <span className="bg-accent/10 text-accent mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg">
                                    <ServiceIcon name={s.icon} className="size-4" />
                                  </span>
                                  <span>
                                    <span className="group-hover:text-accent block text-sm leading-tight font-semibold">
                                      {s.title}
                                    </span>
                                    <span className="text-muted mt-0.5 block text-xs leading-snug">
                                      {s.short}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border-border mt-5 flex items-center justify-between border-t pt-4 text-sm">
                    <span className="text-muted">
                      Not sure what you need? We&apos;ll recommend a plan.
                    </span>
                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="text-accent font-semibold hover:underline"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              )}
            </>
          </div>

          {mainNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "hover:text-accent rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(l.href) && "text-accent",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Magnetic>
              <ButtonLink href="/tools/free-audit" size="md">
                Get Free Audit
              </ButtonLink>
            </Magnetic>
          </div>
          <button
            type="button"
            className="border-border inline-flex size-10 items-center justify-center rounded-full border lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <>
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="animate-menu-in bg-background fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain px-5 pt-4 pb-10 lg:hidden"
          >
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="border-border font-display flex w-full items-center justify-between border-b py-4 text-xl font-semibold"
            >
              Services
              <ChevronDown
                className={cn("size-5 transition-transform", mobileServicesOpen && "rotate-180")}
              />
            </button>
            {mobileServicesOpen && (
              <ul className="border-border space-y-1 border-b py-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="hover:bg-surface-2 flex items-center gap-3 rounded-xl p-2.5 text-sm font-medium"
                    >
                      <ServiceIcon name={s.icon} className="text-accent size-4" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {mainNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeAll}
                className="border-border font-display block border-b py-4 text-xl font-semibold"
              >
                {l.label}
              </Link>
            ))}
            <ButtonLink
              href="/tools/free-audit"
              onClick={closeAll}
              size="lg"
              className="mt-8 w-full"
            >
              Get Free Audit
            </ButtonLink>
          </div>
        )}
      </>
    </header>
  );
}
