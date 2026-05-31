import { useLanguageStore } from "../../app/providers/languageStore";
import { getDictionary } from "dragonspeak";

const layers = ["app", "pages", "widgets", "features", "entities", "shared"];

export function ArchitecturePage() {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  return (
    <div className="page">
      <section className="section-heading">
        <p className="eyebrow">{t.architecture.eyebrow}</p>
        <h1>{t.architecture.title}</h1>
        <p>{t.architecture.subtitle}</p>
      </section>

      <section className="architecture-grid">
        <article className="panel">
          <h2>{t.architecture.eventTitle}</h2>
          <p>{t.architecture.eventText}</p>
        </article>
        <article className="panel">
          <h2>{t.architecture.machineTitle}</h2>
          <p>{t.architecture.machineText}</p>
        </article>
        <article className="panel">
          <h2>{t.architecture.socketTitle}</h2>
          <p>{t.architecture.socketText}</p>
        </article>
        <article className="panel">
          <h2>{t.architecture.demoTitle}</h2>
          <p>{t.architecture.demoText}</p>
        </article>
      </section>

      <section className="panel">
        <h2>{t.architecture.layoutTitle}</h2>
        <div className="layer-stack">
          {layers.map((layer) => (
            <span key={layer}>{layer}/</span>
          ))}
        </div>
      </section>
    </div>
  );
}
