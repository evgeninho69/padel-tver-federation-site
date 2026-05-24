import { ParkIntegrationWidget } from "@/components/ParkIntegrationWidget";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";
import { inputImages } from "@/content/site-data";

const cards = [
  {
    title: "Падел-корты",
    text: "Актуальные слоты, удобная запись и регулярная тренировочная практика.",
    image: inputImages.courtInterior,
  },
  {
    title: "Семейный досуг",
    text: "Кино под открытым небом, веревочный парк и активности для детей.",
    image: inputImages.architecture,
  },
  {
    title: "Единая площадка",
    text: "ROX объединяет спорт, отдых и события для падел-сообщества Твери.",
    image: inputImages.liveMatch,
  },
];

export default function CourtsPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Площадки ROX Padel & Park"
        description="В этом разделе можно посмотреть доступность кортов и выбрать дополнительные активности для спортивного дня."
        imageSrc={inputImages.courtInterior}
        imageAlt="Площадки ROX Padel and Park"
        badge="Сахарово, Тверь"
      />

      <ParkIntegrationWidget userId="8ac4f80d-7ea5-4f99-b10f-7f56066841c1" />

      <RubricCards title="Возможности площадки" items={cards} />
    </main>
  );
}
