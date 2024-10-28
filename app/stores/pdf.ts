import { defineStore } from "pinia";
import * as mupdf from "mupdf";

interface Metadata {
  [key: string]: any;
}

interface Block {
  numblock: number;
  lines: string[];
}

interface Page {
  num_page: number;
  blocks: Block[];
}

interface StructuredDocument {
  pages: Page[];
  headers?: string[];
  footers?: string[];
}

interface TitleItem {
  text: string;
  original: string;
  repetitions: [number, number, number][];
}

export const usePdfStore = defineStore("pdfProcessor", {
  state: () => ({
    metadata: {} as Metadata,
    currentPdf: "",
    currentJson: "",
    document: "",
    jsonSchemas: {
      Proyecto_Ingeniero: `{
        "ingeniero": {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          "direccion": "",
          "telefono": "",
          "email": ""
        },
        "proyecto": {
          "titulo": "",
          "direccion": "",
          "promotor": "",
          "localidad": "",
          "reglamentaciones": [],
          "superficie": "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": ""
        }
      }`,
    },
    sSTOPS: ["<|end-output|>"],
  }),

  actions: {
    setPdf(url: string) {
      this.currentPdf = url;
    },
    setJson(json: any) {
      this.currentJson = JSON.stringify(json);
    },

    filterSdstructureTitles(
      sdstructureTitles: TitleItem[],
      structuredDocument: StructuredDocument
    ): TitleItem[] {
      const filteredTitles: TitleItem[] = [];
      let currentBlock: TitleItem[] = [];
      const seenTexts: { [key: string]: [number, number, number][] } = {};

      sdstructureTitles.forEach((item, i) => {
        const repetitions = item.repetitions;
        const text = item.text;
        const sortedRepetitions = repetitions.map((r) => r).sort();

        if (
          2 <= repetitions.length &&
          repetitions.length <= 3 &&
          new Set(repetitions.map((r) => JSON.stringify(r))).size > 1
        ) {
          if (
            !(text in seenTexts) ||
            JSON.stringify(sortedRepetitions) !==
              JSON.stringify(seenTexts[text])
          ) {
            seenTexts[text] = sortedRepetitions;

            let isValid = true;
            if (i < sdstructureTitles.length - 1) {
              const nextItem = sdstructureTitles[i + 1];
              const nextRepetitions = nextItem.repetitions.map((r) => r).sort();
              for (
                let j = 0;
                j < Math.min(sortedRepetitions.length, nextRepetitions.length);
                j++
              ) {
                if (
                  this.compareRepetitions(
                    sortedRepetitions[j],
                    nextRepetitions[j]
                  ) >= 0
                ) {
                  isValid = false;
                  break;
                }
              }
            }

            if (isValid) {
              if (currentBlock.length === 0) {
                currentBlock.push(item);
              } else {
                const prevItem = currentBlock[currentBlock.length - 1];
                if (
                  this.areTitlesConsecutive(prevItem, item, structuredDocument)
                ) {
                  currentBlock.push(item);
                } else {
                  if (currentBlock.length >= 2) {
                    filteredTitles.push(...currentBlock);
                  }
                  currentBlock = [item];
                }
              }
            }
          }
        }
      });

      if (currentBlock.length >= 2) {
        filteredTitles.push(...currentBlock);
      }

      return filteredTitles;
    },

    areTitlesConsecutive(
      prevItem: TitleItem,
      currItem: TitleItem,
      structuredDocument: StructuredDocument
    ): boolean {
      let consecutiveCount = 0;
      const totalComparisons =
        prevItem.repetitions.length * currItem.repetitions.length;

      for (const [prevPage, prevBlock, prevLine] of prevItem.repetitions) {
        for (const [currPage, currBlock, currLine] of currItem.repetitions) {
          if (prevPage === currPage) {
            if (
              currBlock === prevBlock + 1 ||
              (currBlock === prevBlock && currLine === prevLine + 1)
            ) {
              consecutiveCount++;
            }
          } else if (currPage === prevPage + 1) {
            const prevLastBlock =
              structuredDocument.pages[prevPage].blocks.length - 1;
            if (
              prevBlock === prevLastBlock &&
              currBlock === 0 &&
              currLine === 0
            ) {
              consecutiveCount++;
            }
          }
        }
      }

      return consecutiveCount > 0 && consecutiveCount !== totalComparisons;
    },

    identifyHeadersFooters(
      page: Page,
      headerCandidates: Map<string, number>,
      footerCandidates: Map<string, number>
    ): void {
      const blocks = page.blocks;
      const numBlocks = blocks.length;

      // Check first three blocks for headers
      for (let i = 0; i < Math.min(3, numBlocks); i++) {
        const headerText = this.cleanText(blocks[i].lines.join(" "));
        const headerPattern = headerText.replace(/\d+/g, "\\d+");
        headerCandidates.set(
          headerPattern,
          (headerCandidates.get(headerPattern) || 0) + 1
        );
      }

      // Check last three blocks for footers
      for (let i = Math.max(0, numBlocks - 3); i < numBlocks; i++) {
        const footerText = this.cleanText(blocks[i].lines.join(" "));
        const footerPattern = footerText.replace(/\d+/g, "\\d+");
        footerCandidates.set(
          footerPattern,
          (footerCandidates.get(footerPattern) || 0) + 1
        );
      }
    },

    removeHeadersFooters(
      structuredContent: StructuredDocument
    ): StructuredDocument {
      const headers = structuredContent.headers || [];
      const footers = structuredContent.footers || [];

      structuredContent.pages.forEach((page) => {
        let newBlocks: Block[] = [];
        let skipBlocks = 0;

        page.blocks.forEach((block, i) => {
          if (skipBlocks > 0) {
            skipBlocks--;
            return;
          }

          const blockText = block.lines.join(" ");
          const cleanBlockText = this.cleanText(blockText);

          let isHeaderFooter = false;
          for (const pattern of [...headers, ...footers]) {
            if (new RegExp(pattern).test(cleanBlockText)) {
              isHeaderFooter = true;
              // Check following blocks
              for (let j = 1; j <= 2; j++) {
                if (i + j < page.blocks.length) {
                  const nextBlockText = page.blocks[i + j].lines.join(" ");
                  const combinedText =
                    cleanBlockText + " " + this.cleanText(nextBlockText);
                  if (new RegExp(pattern).test(combinedText)) {
                    skipBlocks = j;
                    break;
                  }
                }
              }
              break;
            }
          }

          if (!isHeaderFooter) {
            newBlocks.push(block);
          }
        });

        page.blocks = newBlocks;
      });

      return structuredContent;
    },

    fillIndexDictSD(
      structuredDocument: StructuredDocument,
      SDStructuredtitlesFiltered: TitleItem[],
      disableDebug: boolean = false
    ): { [key: string]: string[] } {
      const SDindexDict: { [key: string]: string[] } = {};

      SDStructuredtitlesFiltered.forEach((currentItem, i) => {
        const key = currentItem.text;
        const [startPage, startBlock, startLine] = currentItem.repetitions[1];

        let endPage: number, endBlock: number, endLine: number;

        if (i + 1 < SDStructuredtitlesFiltered.length) {
          [endPage, endBlock, endLine] =
            SDStructuredtitlesFiltered[i + 1].repetitions[1];
        } else {
          const lastPage =
            structuredDocument.pages[structuredDocument.pages.length - 1];
          endPage = lastPage.num_page;
          endBlock = lastPage.blocks[lastPage.blocks.length - 1].numblock;
          endLine = lastPage.blocks[lastPage.blocks.length - 1].lines.length;
        }

        const content: string[] = [];
        structuredDocument.pages.forEach((page) => {
          if (startPage <= page.num_page && page.num_page <= endPage) {
            page.blocks.forEach((block) => {
              if (
                (page.num_page === startPage && block.numblock < startBlock) ||
                (page.num_page === endPage && block.numblock > endBlock)
              ) {
                return;
              }

              if (
                page.num_page === startPage &&
                block.numblock === startBlock
              ) {
                content.push(...block.lines.slice(startLine));
              } else if (
                page.num_page === endPage &&
                block.numblock === endBlock
              ) {
                content.push(...block.lines.slice(0, endLine));
              } else {
                content.push(...block.lines);
              }
            });
          }
        });

        const fullContent = content.join("\n");
        SDindexDict[key] = this.splitTextIntoChunks(key, fullContent);
      });

      if (!disableDebug) {
        console.log(`SDindexDict keys: ${Object.keys(SDindexDict)}`);
        console.log(
          `Number of items in SDindexDict: ${Object.keys(SDindexDict).length}`
        );
      }

      return SDindexDict;
    },

    cleanText(text: string | string[]): string {
      if (Array.isArray(text)) {
        text = text.join(" ");
      }
      let cleaned1filter = text.replace(/\n{3,}/g, "\n\n");
      let cleaned2filter = cleaned1filter.replace(
        /[~&/()=#·"@!¡|º\\]+|\.+\s*```/g,
        ""
      );
      let cleaned = cleaned2filter
        .replace(/[0-9.]+\s*/g, "")
        .trim()
        .toLowerCase();
      return cleaned;
    },

    splitTextIntoChunks(
      key: string,
      text: string,
      chunkSize: number = 500,
      overlap: number = 0,
      byWord: boolean = true
    ): string[] {
      const units = byWord ? text.split(" ") : Array.from(text);

      if (overlap !== 0) {
        overlap = Math.floor((chunkSize * overlap) / 100);
      }

      const chunks: string[] = [];
      let i = 0;

      while (i < units.length) {
        const chunkEnd = Math.min(i + chunkSize, units.length);
        let chunk = byWord
          ? units.slice(i, chunkEnd).join(" ")
          : units.slice(i, chunkEnd).join("");
        if (key) {
          chunk = `${key} ${chunk}`;
        }
        chunks.push(chunk);
        i += Math.max(chunkSize - overlap, 1);
      }

      return chunks;
    },

    compareRepetitions(
      rep1: [number, number, number],
      rep2: [number, number, number]
    ): number {
      if (rep1[0] !== rep2[0]) return rep1[0] - rep2[0];
      if (rep1[1] !== rep2[1]) return rep1[1] - rep2[1];
      return rep1[2] - rep2[2];
    },
  },
});
