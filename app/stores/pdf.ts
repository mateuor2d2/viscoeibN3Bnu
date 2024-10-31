export type ProjectTemplate = {
  ingeniero: {
    "nombre o apellidos": string;
    "numero colegiado o de col": string;
    "colegio profesional": string;
    direccion: string;
    telefono: string;
    email: string;
  };
  proyecto: {
    titulo: string;
    direccion: string;
    promotor: string;
    localidad: string;
    reglamentaciones: string[];
    superficie: string;
    "potencia electrica": string;
    "ocupacion numero personas": string;
    "fecha del documento": string;
  };
};
export type ResultsTemplate = {
  extracted_information: {
    ingeniero: {
      "nombre o apellidos": string;
      "numero colegiado o de col": string;
      "colegio profesional": string;
      direccion: string;
      telefono: string;
      email: string;
    };
    proyecto: {
      titulo: string;
      direccion: string;
      promotor: string;
      localidad: string;
      reglamentaciones: string[];
      superficie: string;
      "potencia electrica": string;
      "ocupacion numero personas": string;
      "fecha del documento": string;
    };
  };
};
interface PDFState {
  currentPdf: string;
  sdIndex: Record<string, string[]>;
  template: ProjectTemplate;
  responseIA: ProjectTemplate;
}
export interface S3Response {
  _id: string;
  url: string;
  key: string;
  originalname: string;
  mimetype: string;
  size: number;
  lastModified: string;
  sdIndex: string;
}

export const usePDFStore = defineStore("pdf", {
  state: (): PDFState => ({
    currentPdf: "",
    sdIndex: {},
    template: {
      ingeniero: {
        "nombre o apellidos": "",
        "numero colegiado o de col": "",
        "colegio profesional": "",
        direccion: "",
        telefono: "",
        email: "",
      },
      proyecto: {
        titulo: "",
        direccion: "",
        promotor: "",
        localidad: "",
        reglamentaciones: [],
        superficie: "",
        "potencia electrica": "",
        "ocupacion numero personas": "",
        "fecha del documento": "",
      },
    },
    responseIA: {
      ingeniero: {
        "nombre o apellidos": "",
        "numero colegiado o de col": "",
        "colegio profesional": "",
        direccion: "",
        telefono: "",
        email: "",
      },
      proyecto: {
        titulo: "",
        direccion: "",
        promotor: "",
        localidad: "",
        reglamentaciones: [],
        superficie: "",
        "potencia electrica": "",
        "ocupacion numero personas": "",
        "fecha del documento": "",
      },
    },
  }),

  actions: {
    setPdf(url: string) {
      this.currentPdf = url;
    },
    setSDIndex(SDIndex: Record<string, string[]>) {
      this.sdIndex = SDIndex;
    },
    async sendJsonsToIA() {
      const allPromises: Promise<ResultsTemplate>[] = [];

      await Promise.all(
        Object.entries(this.sdIndex).map(async ([key, texts]) => {
          const textPromises = texts.map((text) =>
            $fetch<ResultsTemplate>("/api/ia", {
              method: "POST",
              body: {
                inputs: {
                  text: text,
                  template: JSON.stringify(this.template),
                },
              },
            })
          );

          allPromises.push(...textPromises);
        })
      );

      const results = await Promise.all(allPromises);
      console.log("results", results);
      const transformedResults = results.map((result) => {
        if (result.extracted_information) {
          return result.extracted_information;
        }
        return result;
      });
      console.log("transformedResults", transformedResults);
      const mergedResult = this.mergeExtractedJsonObjects(transformedResults);
      console.log("mergedResult", mergedResult);
      const processedMergedResult = this.processMergedResult(mergedResult) as {
        ingeniero: {
          "nombre o apellidos": string;
          "numero colegiado o de col": string;
          "colegio profesional": string;
          direccion: string;
          telefono: string;
          email: string;
        };
        proyecto: {
          titulo: string;
          direccion: string;
          promotor: string;
          localidad: string;
          reglamentaciones: string[];
          superficie: string;
          "potencia electrica": string;
          "ocupacion numero personas": string;
          "fecha del documento": string;
        };
      };
      console.log("processdMergedResults", processedMergedResult);
      this.responseIA = processedMergedResult;
      return mergedResult;
    },
    normalizeString(s: string): string {
      return s.toLowerCase().trim().replace(/\s+/g, " ");
    },
    mergeExtractedJsonObjects(
      extractedJsonObjects: Record<string, any>[]
    ): Record<string, any> {
      function mergeValues(v1: any, v2: any): any {
        if (
          v1 instanceof Object &&
          v2 instanceof Object &&
          !Array.isArray(v1) &&
          !Array.isArray(v2)
        ) {
          return mergeDicts(v1, v2);
        } else if (Array.isArray(v1) && Array.isArray(v2)) {
          return [...new Set([...v1, ...v2])];
        } else if (!v1 && v2) {
          return v2;
        } else if (v1 && !v2) {
          return v1;
        } else {
          const values = [v1, v2].filter((v) => v);
          const normalizedValues = values.map((v) =>
            //@ts-ignore
            this.normalizeString(String(v))
          );
          if (new Set(normalizedValues).size === 1) {
            return values[0];
          }
          return values.join("#");
        }
      }
      function mergeDicts(
        d1: Record<string, any>,
        d2: Record<string, any>
      ): Record<string, any> {
        const result = { ...d1 };
        for (const [key, value] of Object.entries(d2)) {
          if (key in result) {
            result[key] = mergeValues(result[key], value);
          } else {
            result[key] = value;
          }
        }
        return result;
      }

      let mergedObject = {};
      for (const jsonObj of extractedJsonObjects) {
        mergedObject = mergeDicts(mergedObject, jsonObj);
      }

      return mergedObject;
    },
    processMergedResult(
      mergedResult: Record<string, any>
    ): Record<string, any> {
      function processValue(value: any): any {
        if (typeof value === "string") {
          const parts = value
            .split("#")
            .map((part) => part.trim())
            .filter(Boolean);
          if (!parts.length) return "";
          //@ts-ignore
          const normalizedParts = parts.map(this.normalizeString);
          const counts = new Map<string, number>();

          normalizedParts.forEach((part) => {
            counts.set(part as string, (counts.get(part as string) || 0) + 1);
          });

          const maxCount = Math.max(...counts.values());
          const mostCommon = [...counts.entries()].find(
            ([_, count]) => count === maxCount
          )?.[0];

          return parts[normalizedParts.indexOf(mostCommon!)];
        } else if (Array.isArray(value)) {
          return value.map(processValue);
        } else if (value instanceof Object) {
          return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, processValue(v)])
          );
        }
        return value;
      }

      return Object.fromEntries(
        Object.entries(mergedResult).map(([k, v]) => [k, processValue(v)])
      );
    },
  },
});
