import { Languages } from "lucide-react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { Language } from "dragonspeak";
import { getDictionary } from "dragonspeak";

const languages: Language[] = ["en", "ru"];

export function LanguageSwitcher() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const t = getDictionary(language);

  return (
    <div className="language-switcher" aria-label={t.language.label}>
      <Languages size={16} aria-hidden="true" />
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          className={item === language ? "active" : ""}
          onClick={() => setLanguage(item)}
          aria-pressed={item === language}
        >
          {item === "en" ? t.language.english : t.language.russian}
        </button>
      ))}
    </div>
  );
}
