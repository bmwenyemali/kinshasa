"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  Heart,
  User,
  Search,
  Menu,
  X,
  Building2,
  FileText,
} from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/communes", label: "Communes", icon: Building2 },
    { href: "/services", label: "Services", icon: FileText },
    { href: "/carte", label: "Carte", icon: Map },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png"
              alt="Kin Services"
              width={40}
              height={40}
              className="w-9 h-9 rounded-xl shadow-sm"
              priority
            />
            <span className="font-bold text-lg text-foreground hidden sm:block tracking-tight">
              Kin Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <Link
              href="/recherche"
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/favoris"
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors hidden sm:flex"
            >
              <Heart className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/profil"
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors hidden sm:flex"
            >
              <User className="w-5 h-5 text-muted-foreground" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors md:hidden"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-border/50 my-2" />
              <Link
                href="/favoris"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80"
              >
                <Heart className="w-5 h-5" />
                Favoris
              </Link>
              <Link
                href="/profil"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80"
              >
                <User className="w-5 h-5" />
                Profil
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt="Kin Services"
                width={40}
                height={40}
                className="w-9 h-9 rounded-xl"
              />
              <span className="font-bold text-lg tracking-tight">
                Kin Services
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Trouvez facilement les services publics à Kinshasa : communes,
              hôpitaux, administrations. Consultez les prix officiels, les
              documents requis et obtenez l&apos;itinéraire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Liens utiles
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/communes" className="hover:text-white transition">
                  Communes
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/carte" className="hover:text-white transition">
                  Carte interactive
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-white transition">
                  Recherche
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:contact@kinservices.cd"
                  className="hover:text-white transition"
                >
                  contact@kinservices.cd
                </a>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/signaler" className="hover:text-white transition">
                  Signaler une erreur
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Kin Services. Développé par Akili Group.</p>
        </div>
      </div>
    </footer>
  );
}
