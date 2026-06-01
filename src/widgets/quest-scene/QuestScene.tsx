import { MessageCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { DialogueLine } from "dragonspeak";
import { getDictionary, translateDialogue } from "dragonspeak";
import { getSceneLoader } from "dragonspeak";

const FallbackScene = () => <div className="scene-loading">Scene not found for this quest.</div>;

const restaurantSceneLoader = getSceneLoader("restaurant-shanghai");
const RestaurantScene = restaurantSceneLoader ? lazy(restaurantSceneLoader) : FallbackScene;

type Props = {
  dialogue: DialogueLine | null;
  questId: string | null;
};

export function QuestScene({ dialogue, questId }: Props) {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);
  const hasRestaurantScene = questId === "restaurant-shanghai";

  return (
    <section className="restaurant-scene">
      <div className="scene-backdrop">
        <Suspense fallback={<div className="scene-loading">Loading 3D scene...</div>}>
          {hasRestaurantScene ? <RestaurantScene active={Boolean(dialogue)} /> : <FallbackScene />}
        </Suspense>
      </div>
      <article className="dialogue-card">
        <div className="panel-heading">
          <h2>{t.scene.npc}</h2>
          <MessageCircle size={18} aria-hidden="true" />
        </div>
        {dialogue ? (
          <>
            <p className="hanzi-line">{dialogue.text}</p>
            <p className="pinyin-line">{dialogue.pinyin}</p>
            <p className="translation-line">{translateDialogue(dialogue, language)}</p>
          </>
        ) : (
          <div className="empty-state">{t.scene.empty}</div>
        )}
      </article>
    </section>
  );
}
