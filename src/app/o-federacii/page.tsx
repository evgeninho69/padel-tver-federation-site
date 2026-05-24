import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";
import { inputImages } from "@/content/site-data";

const cards = [
  {
    title: "Наша миссия",
    text: "Делаем падел доступным и понятным спортом для жителей Тверской области.",
    image: inputImages.duoAction,
  },
  {
    title: "Команда федерации",
    text: "Тренеры, организаторы и судьи работают как единая профессиональная команда.",
    image: inputImages.liveMatch,
  },
  {
    title: "Развитие в регионе",
    text: "Поддерживаем школы, клубы и новые турниры для детей и взрослых.",
    image: inputImages.architecture,
  },
];

export default function FederationPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="О федерации"
        description="Федерация падела Тверской области развивает региональные соревнования, поддерживает тренеров и создает условия для регулярных занятий паделом."
        imageSrc={inputImages.duoAction}
        imageAlt="О федерации падела Тверской области"
        badge="Региональное спортивное сообщество"
      />

      <RubricCards title="Ключевые направления" items={cards} />
    </main>
  );
}
