import { ArrowRight, Radio, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameStore } from "../../app/providers/gameStore";
import { useLanguageStore } from "../../app/providers/languageStore";
import { getDictionary } from "dragonspeak";

export function HomePage() {
  const startQuest = useGameStore((state) => state.startQuest);
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-text">{t.home.pitch}</p>
          <div className="hero-actions">
            <Link to="/quest" className="primary-action" onClick={startQuest}>
              {t.home.start}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/architecture" className="secondary-action">
              {t.home.architecture}
            </Link>
          </div>
        </div>
        <div className="hero-scene" aria-label="Shanghai restaurant quest preview">
          <div className="moon-gate">
            <span>上海餐厅</span>
            <strong>欢迎光临！</strong>
            <small>Huanying guanglin!</small>
            <p>3-step quest</p>
          </div>
          <div className="floating-stat top">{t.home.liveEvent}</div>
          <div className="floating-stat bottom">+360 XP</div>
        </div>
      </section>

      <section className="market-grid" aria-label={t.home.marketLabel}>
        <article>
          <Sparkles size={22} aria-hidden="true" />
          <h2>{t.home.mandarinTitle}</h2>
          <p>{t.home.mandarinText}</p>
        </article>
        <article>
          <Users size={22} aria-hidden="true" />
          <h2>{t.home.gameTitle}</h2>
          <p>{t.home.gameText}</p>
        </article>
        <article>
          <Radio size={22} aria-hidden="true" />
          <h2>{t.home.realtimeTitle}</h2>
          <p>{t.home.realtimeText}</p>
        </article>
      </section>
    </div>
  );
}
