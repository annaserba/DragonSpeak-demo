import { Braces, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { useGameStore } from "../../app/providers/gameStore";
import { useLanguageStore } from "../../app/providers/languageStore";
import { getDictionary } from "dragonspeak";
import { formatEventTime } from "dragonspeak";

export function DevEventInspector() {
  const [open, setOpen] = useState(true);
  const game = useGameStore((state) => state.game);
  const connectionStatus = useGameStore((state) => state.connectionStatus);
  const latency = useGameStore((state) => state.latency);
  const bufferSize = useGameStore((state) => state.eventBufferSize);
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);
  const lastEvents = useMemo(() => game.eventLog.slice(-20).reverse(), [game.eventLog]);

  return (
    <aside className={open ? "dev-inspector open" : "dev-inspector"}>
      <button
        type="button"
        className="inspector-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t.inspector.collapse : t.inspector.expand}
      >
        {open ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
      </button>
      {open && (
        <div className="inspector-content">
          <div className="panel-heading">
            <h2>{t.inspector.title}</h2>
            <Braces size={18} aria-hidden="true" />
          </div>
          <div className="inspector-metrics">
            <span>{connectionStatus}</span>
            <span>{latency}ms</span>
            <span>
              {t.inspector.buffer} {bufferSize}
            </span>
            <span>
              {game.eventLog.length} {t.inspector.events}
            </span>
          </div>
          <section>
            <h3>{t.inspector.stream}</h3>
            <div className="event-list">
              {lastEvents.length === 0 ? (
                <div className="empty-state">{t.inspector.empty}</div>
              ) : (
                lastEvents.map((event) => (
                  <article key={`${event.type}-${event.timestamp}`}>
                    <span>{formatEventTime(event.timestamp)}</span>
                    <strong>{event.type}</strong>
                    <code>{JSON.stringify(event)}</code>
                  </article>
                ))
              )}
            </div>
          </section>
          <section>
            <h3>{t.inspector.state}</h3>
            <pre>{JSON.stringify({ ...game, eventLog: game.eventLog.slice(-3) }, null, 2)}</pre>
          </section>
        </div>
      )}
    </aside>
  );
}
