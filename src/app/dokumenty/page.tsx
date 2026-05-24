"use client";

import { DocumentRegistry } from "@/components/DocumentRegistry";
import { federationDocuments, inputImages } from "@/content/site-data";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";

const cards = [
  {
    title: "Регламенты турниров",
    text: "Официальные документы по проведению и участию в региональных стартах.",
    image: inputImages.racketCloseup,
  },
  {
    title: "Нормативные материалы",
    text: "Положения и стандарты, на которые опирается работа федерации.",
    image: inputImages.architecture,
  },
  {
    title: "Архив отчетов",
    text: "Публикации по итогам сезона и внутренней деятельности федерации.",
    image: inputImages.courtInterior,
  },
];

export default function DocumentsPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Документы"
        description="Открытый реестр документов федерации: положения, стандарты, решения и отчеты по спортивной деятельности."
        imageSrc={inputImages.racketCloseup}
        imageAlt="Документы федерации"
        badge="Официальный реестр"
      />

      <DocumentRegistry
        documents={[...federationDocuments]}
        onTrackDownload={(payload) => {
          console.log("Download tracked", payload);
        }}
      />

      <RubricCards title="Что доступно в разделе" items={cards} />
    </main>
  );
}
