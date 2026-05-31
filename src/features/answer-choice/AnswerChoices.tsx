import { CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { Choice } from "dragonspeak";
import { getDictionary, translateChoice } from "dragonspeak";

type Props = {
  choices: Choice[];
  disabled: boolean;
  onAnswer: (answerId: string) => void;
};

export function AnswerChoices({ choices, disabled, onAnswer }: Props) {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);

  if (choices.length === 0) {
    return <div className="empty-state">{t.choices.waiting}</div>;
  }

  return (
    <div className="choice-list">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          disabled={disabled}
          onClick={() => onAnswer(choice.id)}
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>
            <strong>{choice.text}</strong>
            <small>{choice.pinyin}</small>
            <em>{translateChoice(choice, language)}</em>
          </span>
        </button>
      ))}
    </div>
  );
}
