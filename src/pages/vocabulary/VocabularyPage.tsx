import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { useGameStore } from "../../app/providers/gameStore";
import { useLanguageStore } from "../../app/providers/languageStore";
import { fallbackVocabulary } from "../../entities/vocabulary/model";
import { getDictionary } from "dragonspeak";
import type { UnlockedWord } from "dragonspeak";

const columnHelper = createColumnHelper<UnlockedWord>();

export function VocabularyPage() {
  const unlockedWords = useGameStore((state) => state.game.unlockedWords);
  const language = useLanguageStore((state) => state.language);
  const t = getDictionary(language);
  const data = useMemo(
    () => (unlockedWords.length > 0 ? unlockedWords : fallbackVocabulary),
    [unlockedWords],
  );
  const columns = useMemo(
    () => [
      columnHelper.accessor("hanzi", {
        header: t.vocabulary.hanzi,
        cell: (info) => <strong className="hanzi-cell">{info.getValue()}</strong>,
      }),
      columnHelper.accessor("pinyin", { header: t.vocabulary.pinyin }),
      columnHelper.accessor("meaning", { header: t.vocabulary.meaning }),
      columnHelper.accessor("status", {
        header: t.vocabulary.status,
        cell: (info) => <span className="status-badge">{info.getValue()}</span>,
      }),
    ],
    [t],
  );
  // TanStack Table intentionally returns table instance functions; this is the library's supported pattern.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="page">
      <section className="section-heading">
        <p className="eyebrow">{t.vocabulary.eyebrow}</p>
        <h1>{t.vocabulary.title}</h1>
        <p>{t.vocabulary.subtitle}</p>
      </section>

      <section className="panel table-panel">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <button
            type="button"
            className="icon-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t.vocabulary.previous}
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
          <span>
            {t.vocabulary.page} {table.getState().pagination.pageIndex + 1} {t.vocabulary.of}{" "}
            {table.getPageCount()}
          </span>
          <button
            type="button"
            className="icon-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t.vocabulary.next}
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
