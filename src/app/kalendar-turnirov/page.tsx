import { LiveTournamentBracket } from "@/components/LiveTournamentBracket";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";
import { inputImages } from "@/content/site-data";

const cards = [
  {
    title: "Форматы турниров",
    text: "Americano, Mexicano, Escalera и классические парные старты по категориям.",
    image: inputImages.liveMatch,
  },
  {
    title: "Регистрация пар",
    text: "Подача заявки заранее помогает быстро сформировать ровную и честную сетку.",
    image: inputImages.racketCloseup,
  },
  {
    title: "Судейская поддержка",
    text: "Каждый турнир сопровождается судьями и прозрачной фиксацией результатов.",
    image: inputImages.duoAction,
  },
];

export default function TournamentsPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Календарь турниров"
        description="Следите за ближайшими стартами, планируйте участие и смотрите, как развивается турнирная сетка по ходу матчей."
        imageSrc={inputImages.liveMatch}
        imageAlt="Турнирный календарь падела"
        badge="Сезонные старты"
      />

      <LiveTournamentBracket tournamentId="demo-tournament" enableRealtime={false} />

      <RubricCards title="Как устроены соревнования" items={cards} />
    </main>
  );
}
