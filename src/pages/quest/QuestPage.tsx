import { Activity, BadgeCheck, BookMarked, Coffee, Receipt, Target, UtensilsCrossed } from "lucide-react";
import { useEffect } from "react";
import { useGameStore } from "../../app/providers/gameStore";
import { useLanguageStore } from "../../app/providers/languageStore";
import { AnswerChoices } from "../../features/answer-choice/AnswerChoices";
import { ConnectionControls } from "../../features/realtime-connection/ConnectionControls";
import { getDictionary, translateTick } from "dragonspeak";
import { DevEventInspector } from "../../widgets/dev-event-inspector/DevEventInspector";
import { Leaderboard } from "../../widgets/leaderboard/Leaderboard";
import { QuestScene } from "../../widgets/quest-scene/QuestScene";
import { percentage } from "dragonspeak";

type QuestStepConfig = {
  step: number;
  labelKey: keyof ReturnType<typeof getDictionary>["quest"];
  icon: typeof Coffee;
  questionId: string | null;
};

const STEP_CONFIGS: QuestStepConfig[] = [
  { step: 1, labelKey: "stepDrink", icon: Coffee, questionId: "q-order-drink" },
  { step: 2, labelKey: "stepFood", icon: UtensilsCrossed, questionId: "q-order-food" },
  { step: 3, labelKey: "stepBill", icon: Receipt, questionId: "q-pay-bill" },
];

const getCurrentStep = (activeQuestionId: string | null, status: string): number => {
  if (status === "completed") return 3;
  for (const config of STEP_CONFIGS) {
    if (config.questionId === activeQuestionId) return config.step;
  }
  return 1;
};

export function QuestPage() {
  const game = useGameStore((state) => state.game);
  const startQuest = useGameStore((state) => state.startQuest);
  const answer = useGameStore((state) => state.answer);
  const reconnect = useGameStore((state) => state.reconnect);
  const reset = useGameStore((state) => state.reset);
  const connectionStatus = useGameStore((state) => state.connectionStatus);
  const latency = useGameStore((state) => state.latency);
  const eventBufferSize = useGameStore((state) => state.eventBufferSize);
  const onlineTicks = useGameStore((state) => state.onlineTicks);
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  useEffect(() => {
    if (game.status === "idle") {
      startQuest();
    }
  }, [game.status, startQuest]);

  const answered = game.answers.some(
    (item) => item.playerId === "player-you" && item.questionId === game.activeQuestionId,
  );

  const currentStep = getCurrentStep(game.activeQuestionId, game.status);

  return (
    <div className="quest-layout">
      <div className="quest-main">
        <section className="quest-header">
          <div>
            <p className="eyebrow">{t.quest.eyebrow}</p>
            <h1>{t.quest.title}</h1>
          </div>
          <div className="score-card">
            <span>{t.quest.score}</span>
            <strong>{game.score}</strong>
          </div>
        </section>

        <div className="progress-shell" aria-label={`${t.quest.progress} ${game.progress}%`}>
          <span style={{ width: percentage(game.progress) }} />
        </div>

        <div className="step-indicator" aria-label={t.quest.step.replace("{current}", String(currentStep)).replace("{total}", "3")}>
          {STEP_CONFIGS.map((config) => {
            const isActive = config.step === currentStep;
            const isPast = config.step < currentStep;
            const Icon = config.icon;
            return (
              <div
                key={config.step}
                className={`step-dot ${isActive ? "step-active" : ""} ${isPast ? "step-done" : ""}`}
              >
                <span className="step-icon">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="step-label">{t.quest[config.labelKey]}</span>
              </div>
            );
          })}
        </div>

        <QuestScene dialogue={game.currentDialogue} questId={game.questId} />

        <section className="panel">
          <div className="panel-heading">
            <h2>{t.quest.answers}</h2>
            <Target size={18} aria-hidden="true" />
          </div>
          <AnswerChoices
            choices={game.choices}
            disabled={answered || game.status === "completed"}
            onAnswer={answer}
          />
        </section>

        {game.reward && (
          <section className="reward-panel">
            <BadgeCheck size={22} aria-hidden="true" />
            <div>
              <h2>{t.quest.completed}</h2>
              <p>
                {game.reward.title}{" "}
                {t.quest.completedText
                  .replace("{xp}", String(game.reward.xp))
                  .replace("{badge}", game.reward.unlockedBadge)}
              </p>
            </div>
          </section>
        )}
      </div>

      <div className="quest-side">
        <ConnectionControls
          status={connectionStatus}
          latency={latency}
          bufferSize={eventBufferSize}
          onStart={startQuest}
          onReconnect={reconnect}
          onReset={reset}
        />
        <section className="panel compact-panel">
          <div className="panel-heading">
            <h2>{t.quest.unlockedWords}</h2>
            <BookMarked size={18} aria-hidden="true" />
          </div>
          {game.unlockedWords.length === 0 ? (
            <div className="empty-state">{t.quest.wordsEmpty}</div>
          ) : (
            <div className="word-chips">
              {game.unlockedWords.map((word) => (
                <span key={word.wordId}>
                  <strong>{word.hanzi}</strong> {word.pinyin}
                </span>
              ))}
            </div>
          )}
        </section>
        <section className="panel compact-panel">
          <div className="panel-heading">
            <h2>{t.quest.realtimeEvents}</h2>
            <Activity size={18} aria-hidden="true" />
          </div>
          {onlineTicks.length === 0 ? (
            <div className="empty-state">{t.quest.presenceEmpty}</div>
          ) : (
            <ul className="tick-list">
              {onlineTicks.map((tick, index) => (
                <li key={`${tick}-${index}`}>{translateTick(tick, language)}</li>
              ))}
            </ul>
          )}
        </section>
        <Leaderboard players={game.leaderboard} />
      </div>

      <DevEventInspector />
    </div>
  );
}
