import { Crown } from "lucide-react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { PlayerScore } from "dragonspeak";
import { getDictionary } from "dragonspeak";

type Props = {
  players: PlayerScore[];
};

export function Leaderboard({ players }: Props) {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>{t.leaderboard.title}</h2>
        <Crown size={18} aria-hidden="true" />
      </div>
      {players.length === 0 ? (
        <div className="empty-state">{t.leaderboard.empty}</div>
      ) : (
        <ol className="leaderboard">
          {players.map((player, index) => (
            <li key={player.playerId} className={player.isCurrentPlayer ? "current-player" : ""}>
              <span>{index + 1}</span>
              <strong>{player.displayName}</strong>
              <small>
                {player.streak} {t.leaderboard.streak}
              </small>
              <b>{player.score}</b>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
