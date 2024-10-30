import { defineStore } from "pinia";
import { PDFProcessor } from "~/utils/PDFProcessor";
// import * as mupdf from "mupdf";
interface PDFState {
  // filename: string;
  // number: number;
  // extractedChunks: Record<string, any>;
  // processor: PDFProcessor;
  currentPdf: string;
}

// interface StructuredContent {
//   headers: string[];
//   footers: string[];
//   pages: Array<{
//     num_page: number;
//     blocks: Array<{
//       numblock: number;
//       lines: string[];
//     }>;
//   }>;
// }

// interface ExtractionResult {
//   structuredContent: StructuredContent;
//   metadata: Record<string, any>;
//   sdStructureTitlesFiltered: Array<{
//     text: string;
//     original: string;
//     repetitions: [number, number, number][];
//   }>;
// }

export const usePDFStore = defineStore("pdf", {
  state: (): PDFState => ({
    // filename: "",
    // number: 0,
    // extractedChunks: {},
    // processor: new PDFProcessor(),
    currentPdf: "",
  }),

  actions: {
    setPdf(url: string) {
      this.currentPdf = url;
    },

    //     loadBase64PDF(base64String: string) {
    //       const pdfData = base64String.replace(
    //         /^data:application\/pdf;base64,/,
    //         ""
    //       );
    //       const binaryString = atob(pdfData);
    //       const bytes = new Uint8Array(binaryString.length);
    //       for (let i = 0; i < binaryString.length; i++) {
    //         bytes[i] = binaryString.charCodeAt(i);
    //       }
    //       const doc = mupdf.Document.openDocument(bytes, "application/pdf");
    //       return doc;
    //     },
    //     async extractAndFormatPDFText(): Promise<ExtractionResult> {
    //       const headerCandidates = new Map<string, number>();
    //       const footerCandidates = new Map<string, number>();
    //       const metadata: Record<string, any> = {};

    //       const structuredContent: StructuredContent = {
    //         headers: [],
    //         footers: [],
    //         pages: [],
    //       };
    //       // const pdfDoc = this;
    //       const pdfDoc = this.loadBase64PDF(this.currentPdf);
    //       const numPages = pdfDoc.countPages();

    //       for (let i = 0; i < numPages; i++) {
    //         const page = pdfDoc.loadPage(i + 1);
    //         const textContent = page.toStructuredText();

    //         const structuredPage = {
    //           num_page: i + 1,
    //           blocks: [],
    //         };
    //         console.log("########################", i);
    //         console.log(textContent);
    //         // textContent.forEach((block: any, blockNum: number) => {
    //         //   if (block.str) {
    //         //     const structuredBlock = this.processor.processBlock(
    //         //       block,
    //         //       blockNum
    //         //     );
    //         //     structuredPage.blocks.push(structuredBlock);
    //         //   }
    //         // });

    //         // structuredContent.pages.push(structuredPage);

    //         // this.processor.identifyHeadersFooters(
    //         //   structuredPage,
    //         //   headerCandidates,
    //         //   footerCandidates
    //         // );
    //       }

    //       // const threshold = 2;
    //       // structuredContent.headers = Array.from(headerCandidates.entries())
    //       //   .filter(([_, count]) => count > threshold)
    //       //   .map(([header]) => header);

    //       // structuredContent.footers = Array.from(footerCandidates.entries())
    //       //   .filter(([_, count]) => count > threshold)
    //       //   .map(([footer]) => footer);

    //       // this.processor.removeHeadersFooters(structuredContent);

    //       // const sdStructureTitles =
    //       //   this.processor.extractRepeatedPartsFromStructuredDocument(
    //       //     structuredContent
    //       //   );
    //       // const sdStructureTitlesFiltered = this.processor.filterSdstructureTitles(
    //       //   sdStructureTitles,
    //       //   structuredContent
    //       // );

    //       return {
    //         structuredContent,
    //         metadata,
    //         sdStructureTitlesFiltered: [],
    //       };
    //     },
  },
});
