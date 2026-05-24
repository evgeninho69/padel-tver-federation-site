"use client";

import { RegionalRatingTable } from "@/components/RegionalRatingTable";
import { inputImages, ratingPlayers } from "@/content/site-data";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";

const cards = [
  {
    title: "Прозрачные очки",
    text: "Результаты матчей напрямую влияют на личную позицию в таблице.",
    image: inputImages.racketCloseup,
  },
  {
    title: "История игрока",
    text: "Каждый спортсмен видит свой прогресс от турнира к турниру.",
    image: inputImages.architecture,
  },
  {
    title: "Путь в сборную",
    text: "Стабильные выступления в рейтинге помогают попасть в расширенный состав.",
    image: inputImages.duoAction,
  },
];

export default function RatingPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Рейтинг игроков"
        description="Региональный рейтинг показывает спортивную форму игроков и помогает формировать посев на ключевые соревнования."
        imageSrc={inputImages.duoAction}
        imageAlt="Рейтинг игроков падела"
        badge="Таблица сезона"
      />

      <RegionalRatingTable
        players={[...ratingPlayers]}
        onBindTempProfile={(playerId) => {
          console.log("Bind TEMP profile", playerId);
        }}
      />

      <RubricCards title="Что дает рейтинг" items={cards} />
    </main>
  );
}
