import { BookOpen, Cable, Map, ScrollText, Trophy } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useGameStore } from "../../app/providers/gameStore";
import { useLanguageStore } from "../../app/providers/languageStore";
import { LanguageSwitcher } from "../../features/language-switcher/LanguageSwitcher";
import { getDictionary } from "dragonspeak";

export function AppShell() {
  const connectionStatus = useGameStore((state) => state.connectionStatus);
  const latency = useGameStore((state) => state.latency);
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);
  const navItems = [
    { to: "/", label: t.nav.home, icon: Map },
    { to: "/quest", label: t.nav.quest, icon: Trophy },
    { to: "/vocabulary", label: t.nav.vocabulary, icon: BookOpen },
    { to: "/architecture", label: t.nav.architecture, icon: ScrollText },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="DragonSpeak home">
          <span className="brand-mark">汉</span>
          <span>
            <strong>DragonSpeak</strong>
            <small>{t.nav.subtitle}</small>
          </span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="connection-pill">
          <Cable size={16} aria-hidden="true" />
          <span>{connectionStatus}</span>
          <strong>{latency}ms</strong>
        </div>
        <LanguageSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
