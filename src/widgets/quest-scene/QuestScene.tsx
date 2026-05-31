import { MessageCircle } from "lucide-react";
import { lazy, type ComponentType, Suspense } from "react";
import { useLanguageStore } from "../../app/providers/languageStore";
import type { DialogueLine } from "dragonspeak";
import { getDictionary, translateDialogue } from "dragonspeak";
import { getSceneLoader } from "dragonspeak";

type SceneProps = { active: boolean };

const FallbackScene = ({ active: _active }: SceneProps) => (
  <div className="scene-loading">Scene not found for this quest.</div>
);

const sceneCache = new Map<string | null, ComponentType<SceneProps>>();

const getLazyScene = (questId: string | null) => {
  const cached = sceneCache.get(questId);
  if (cached) return cached;

  const loader = getSceneLoader(questId);
  const Scene = loader
    ? lazy(loader)
    : lazy<ComponentType<SceneProps>>(() => Promise.resolve({ default: FallbackScene }));
  sceneCache.set(questId, Scene);
  return Scene;
};

type Props = {
  dialogue: DialogueLine | null;
  questId: string | null;
};

export function QuestScene({ dialogue, questId }: Props) {
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);
  const Scene = getLazyScene(questId);

  return (
    <section className="restaurant-scene">
      <div className="scene-backdrop">
        <Suspense fallback={<div className="scene-loading">Loading 3D scene...</div>}>
          <Scene active={Boolean(dialogue)} />
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
