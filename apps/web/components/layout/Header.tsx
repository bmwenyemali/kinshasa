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
  Landmark,
  Shield,
  LogIn,
} from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem("kinservices_user");
      if (stored) {
        setLoggedIn(true);
        try {
          const parsed = JSON.parse(stored);
          setIsAdmin(parsed.role === "ADMINISTRATEUR");
        } catch {}
      } else {
        setLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkAuth();

    // Re-check when localStorage changes (e.g. login in another tab or profile update)
    window.addEventListener("storage", checkAuth);

    // Also listen for custom event dispatched after login/role update in same tab
    window.addEventListener("kinservices_auth_change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("kinservices_auth_change", checkAuth);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/communes", label: "Communes", icon: Building2 },
    { href: "/services", label: "Services", icon: FileText },
    { href: "/simulateur", label: "Simulateur", icon: FileText },
    { href: "/carte", label: "Carte", icon: Map },
    { href: "/gestion-ville", label: "La Ville", icon: Landmark },
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
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors hidden sm:flex"
                title="Administration"
              >
                <Shield className="w-5 h-5 text-primary" />
              </Link>
            )}
            <Link
              href={loggedIn ? "/profil" : "/auth/login"}
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors hidden sm:flex"
              title={loggedIn ? "Mon profil" : "Se connecter"}
            >
              {loggedIn ? (
                <User className="w-5 h-5 text-primary" />
              ) : (
                <LogIn className="w-5 h-5 text-muted-foreground" />
              )}
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
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary hover:bg-primary/10"
                >
                  <Shield className="w-5 h-5" />
                  Administration
                </Link>
              )}
              <Link
                href={loggedIn ? "/profil" : "/auth/login"}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80"
              >
                {loggedIn ? (
                  <>
                    <User className="w-5 h-5" />
                    Mon profil
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se connecter
                  </>
                )}
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
                <Link
                  href="/gestion-ville"
                  className="hover:text-white transition"
                >
                  Gestion de la Ville
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-white transition">
                  Recherche
                </Link>
              </li>
              <li>
                <Link
                  href="/simulateur"
                  className="hover:text-white transition"
                >
                  Simulateur
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/statistiques"
                  className="hover:text-white transition"
                >
                  Statistiques
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
          <p>
            © 2026 Kin Services. Développé par{" "}
            <a
              href="https://akilig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Akili Group
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
