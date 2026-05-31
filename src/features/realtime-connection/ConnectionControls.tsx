import { RefreshCw, RotateCcw, Wifi } from "lucide-react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { ConnectionStatus } from "dragonspeak";
import { getDictionary } from "dragonspeak";

type Props = {
  status: ConnectionStatus;
  latency: number;
  bufferSize: number;
  onStart: () => void;
  onReconnect: () => void;
  onReset: () => void;
};

export function ConnectionControls({
  status,
  latency,
  bufferSize,
  onStart,
  onReconnect,
  onReset,
}: Props) {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  return (
    <section className="panel compact-panel">
      <div className="panel-heading">
        <h2>{t.realtime.title}</h2>
        <Wifi size={18} aria-hidden="true" />
      </div>
      <div className="metric-row">
        <span>{t.realtime.status}</span>
        <strong>{status}</strong>
      </div>
      <div className="metric-row">
        <span>{t.realtime.latency}</span>
        <strong>{latency}ms</strong>
      </div>
      <div className="metric-row">
        <span>{t.realtime.buffer}</span>
        <strong>{bufferSize}</strong>
      </div>
      <div className="button-row">
        <button
          type="button"
          onClick={onStart}
          className="icon-button"
          aria-label={t.realtime.start}
        >
          <Wifi size={17} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onReconnect}
          className="icon-button"
          aria-label={t.realtime.reconnect}
        >
          <RefreshCw size={17} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="icon-button"
          aria-label={t.realtime.reset}
        >
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
