"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DocumentCategory =
  | "Федеральные стандарты"
  | "Региональные положения"
  | "Антидопинг"
  | "Аудиторские отчеты";

export interface FederationDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  fileSizeBytes: number;
  uploadedAt: string;
  downloadUrl: string;
  fz329Compliant: boolean;
}

export interface DownloadTrackPayload {
  documentId: string;
  category: DocumentCategory;
  downloadedAtISO: string;
}

interface DocumentRegistryProps {
  documents: FederationDocument[];
  onTrackDownload?: (payload: DownloadTrackPayload) => Promise<void> | void;
}

const categories: Array<DocumentCategory | "ALL"> = [
  "ALL",
  "Федеральные стандарты",
  "Региональные положения",
  "Антидопинг",
  "Аудиторские отчеты",
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isSafePdfLink(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

export function DocumentRegistry({ documents, onTrackDownload }: DocumentRegistryProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState<DocumentCategory | "ALL">("ALL");

  const filteredDocuments = React.useMemo(() => {
    if (activeCategory === "ALL") {
      return documents;
    }
    return documents.filter((document) => document.category === activeCategory);
  }, [activeCategory, documents]);

  const handleDownload = React.useCallback(
    async (document: FederationDocument) => {
      if (!isSafePdfLink(document.downloadUrl)) {
        return;
      }

      await onTrackDownload?.({
        documentId: document.id,
        category: document.category,
        downloadedAtISO: new Date().toISOString(),
      });

      const anchor = window.document.createElement("a");
      anchor.href = document.downloadUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.referrerPolicy = "no-referrer";
      anchor.download = "";
      anchor.click();
    },
    [onTrackDownload],
  );

  return (
    <Card className="border-[#2f6a4b]/20 bg-[#fffdf8]/90 shadow-sm backdrop-blur-sm">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-black text-[#275f46] md:text-2xl">Реестр документов</CardTitle>
            <p className="mt-1 text-sm text-slate-600">Хранилище документов федерации с контролем выгрузок.</p>
          </div>
          <Badge className="bg-[#2f6a4b]/10 text-[#2f6a4b]">Соответствие 329-ФЗ</Badge>
        </div>

        <div className="rounded-xl border border-[#2f6a4b]/15 bg-[#edd3a5]/20 p-3 text-sm text-slate-700">
          Скачивание доступно только для защищенных PDF-ссылок. Каждое действие может логироваться в аудит-трек.
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
                activeCategory === category
                  ? "border-[#2f6a4b] bg-[#2f6a4b] text-white"
                  : "border-[#2f6a4b]/25 bg-white text-[#2f6a4b] hover:bg-[#2f6a4b]/5",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category === "ALL" ? "Все категории" : category}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table className="min-w-[820px]">
            <TableHeader className="bg-[#2f6a4b]/5">
              <TableRow>
                <TableHead>Документ</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead>Дата загрузки</TableHead>
                <TableHead>Комплаенс</TableHead>
                <TableHead className="text-right">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => {
                const safePdf = isSafePdfLink(document.downloadUrl);

                return (
                  <TableRow key={document.id}>
                    <TableCell className="font-semibold text-slate-800">{document.title}</TableCell>
                    <TableCell className="text-slate-700">{document.category}</TableCell>
                    <TableCell>{formatFileSize(document.fileSizeBytes)}</TableCell>
                    <TableCell>{formatDate(document.uploadedAt)}</TableCell>
                    <TableCell>
                      <Badge className={document.fz329Compliant ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}>
                        {document.fz329Compliant ? "Соответствует" : "Проверка нужна"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        disabled={!safePdf || !document.fz329Compliant}
                        onClick={() => void handleDownload(document)}
                        className="bg-[#2f6a4b] text-white hover:bg-[#244f38] disabled:bg-slate-300"
                      >
                        Скачать PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
