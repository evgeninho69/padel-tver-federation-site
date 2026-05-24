import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function generateStaticParams(): Array<{ id: string }> {
  return [{ id: "demo-tournament" }];
}

const payload = {
  tournament_id: "demo-tournament",
  tournament_type: "CLASSIC_FIP",
  format: "STANDARD_BRACKET",
  groups: [],
  rounds: [
    [
      {
        match_id: "m-1",
        stage: "Четвертьфинал",
        team_1: {
          player_1_id: "1",
          player_2_id: "2",
          player_1_name: "Иван Смирнов",
          player_2_name: "Алексей Васильев"
        },
        team_2: {
          player_1_id: "3",
          player_2_id: "4",
          player_1_name: "Дмитрий Морозов",
          player_2_name: "Павел Орлов"
        },
        set_1_score: "6:4",
        set_2_score: "6:3",
        set_3_score: null,
        winner_team: 1,
        referee: "А. Крылов",
        venue: "ROX Padel & Park",
        rating_points_for_winner: 55
      },
      {
        match_id: "m-2",
        stage: "Четвертьфинал",
        team_1: {
          player_1_id: "5",
          player_2_id: "6",
          player_1_name: "Екатерина Козлова",
          player_2_name: "Анна Петрова"
        },
        team_2: {
          player_1_id: "7",
          player_2_id: "8",
          player_1_name: "Ольга Сергеева",
          player_2_name: "Марина Демина"
        },
        set_1_score: null,
        set_2_score: null,
        set_3_score: null,
        winner_team: null,
        referee: "Е. Соколова",
        venue: "ROX Padel & Park",
        rating_points_for_winner: 55
      }
    ],
    [
      {
        match_id: "m-3",
        stage: "Полуфинал",
        team_1: {
          player_1_id: null,
          player_2_id: null,
          player_1_name: "Победители четвертьфинала 1",
          player_2_name: "Победители четвертьфинала 1"
        },
        team_2: {
          player_1_id: null,
          player_2_id: null,
          player_1_name: "Победители четвертьфинала 2",
          player_2_name: "Победители четвертьфинала 2"
        },
        set_1_score: null,
        set_2_score: null,
        set_3_score: null,
        winner_team: null,
        referee: "Назначается",
        venue: "ROX Padel & Park",
        rating_points_for_winner: 70
      }
    ]
  ]
};

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(payload, { status: 200 });
}
