// import { encode } from "gpt-tokenizer";

interface Block {
  numblock: number;
  lines: string[];
  type?: number;
  text?: string;
  spans?: any[];
}

interface Page {
  num_page: number;
  blocks: Block[];
}

interface StructuredDocument {
  headers: string[];
  footers: string[];
  pages: Page[];
}

interface TitleItem {
  text: string;
  original: string;
  repetitions: [number, number, number][];
}

export class PDFProcessor {
  private metadata: Record<string, any>;
  private document: string;
  private jsonSchemas: Record<string, string>;
  private sSTOPS: string[];

  constructor() {
    this.metadata = {};
    this.document = "";
    this.jsonSchemas = {
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
    };
    this.sSTOPS = ["<|end-output|>"];
  }

  processBlock(block: any, blockNum: number): Block {
    const structuredBlock: Block = {
      numblock: blockNum,
      lines: [],
    };

    if (block.lines) {
      for (const line of block.lines) {
        if (line.spans) {
          const lineText = line.spans.map((span: any) => span.text).join(" ");
          structuredBlock.lines.push(lineText);
        } else {
          structuredBlock.lines.push("");
        }
      }
    } else {
      const blockText = block.text || "";
      structuredBlock.lines.push(blockText);
    }

    return structuredBlock;
  }

  identifyHeadersFooters(
    page: { blocks: Block[] },
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
  }

  removeHeadersFooters(
    structuredContent: StructuredDocument
  ): StructuredDocument {
    const { headers, footers } = structuredContent;

    structuredContent.pages = structuredContent.pages.map((page) => {
      let newBlocks: Block[] = [];
      let skipBlocks = 0;

      for (let i = 0; i < page.blocks.length; i++) {
        if (skipBlocks > 0) {
          skipBlocks--;
          continue;
        }

        const block = page.blocks[i];
        const blockText = block.lines.join(" ");
        const cleanBlockText = this.cleanText(blockText);

        let isHeaderFooter = false;
        for (const pattern of [...headers, ...footers]) {
          if (new RegExp(pattern).test(cleanBlockText)) {
            isHeaderFooter = true;
            break;
          }
        }

        if (!isHeaderFooter) {
          newBlocks.push(block);
        }
      }

      return {
        ...page,
        blocks: newBlocks,
      };
    });

    return structuredContent;
  }

  private cleanText(text: string | string[]): string {
    const textStr = Array.isArray(text) ? text.join(" ") : text;
    return textStr
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[~&/()=#·"@!¡|º\\]+|\.+\s*/g, "")
      .replace(/[0-9.]+\s*/g, "")
      .trim()
      .toLowerCase();
  }

  splitTextIntoChunks(
    key: string,
    text: string,
    chunkSize = 500,
    overlap = 0,
    byWord = true
  ): string[] {
    const units = byWord ? text.split(" ") : text.split("");
    const chunks: string[] = [];

    if (overlap !== 0) {
      overlap = Math.floor((chunkSize * overlap) / 100);
    }

    let i = 0;
    while (i < units.length) {
      const chunkEnd = Math.min(i + chunkSize, units.length);
      const chunk = units.slice(i, chunkEnd).join(byWord ? " " : "");
      chunks.push(key ? `${key} ${chunk}` : chunk);
      i += Math.max(chunkSize - overlap, 1);
    }

    return chunks;
  }
}
