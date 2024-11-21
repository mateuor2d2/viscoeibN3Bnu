export type ProjectTemplate = {
  [category: string]: {
    [field: string]: string | string[] | number | boolean;
  };
};
export type ResultsTemplate = [
  {
    extracted_information: string;
  }
];
interface PDFState {
  currentPdf: string;
  sdIndex: Record<string, string[]>;
  template: ProjectTemplate;
  responseIA: any;
  mergedResponseIA: any;
  step: number;
  isSending: boolean;
  testResult: any;
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
type JsonValue = string | string[] | JsonObject;
interface JsonObject {
  [key: string]: JsonValue | undefined;
}
export const usePDFStore = defineStore("pdf", {
  state: (): PDFState => ({
    currentPdf: "",
    step: 0,
    isSending: false,
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
    mergedResponseIA: {
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
    testResult: [
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Venta de tabacos, prensa y revistas",
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
      {
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
          reglamentaciones: [
            "PGOU del término municipal",
            "Ordenanzas municipales",
            "Annexo I, nomenclator de actividades molestas, nocivas, insalubres y peligrosas, aprobado por el decreto 19/1996, de 8 de febrero",
            "Reglamento electrotécnico de baja tensión e instrucciones complementarias ITC.BT de 2002.08.02",
            "CTE. Código técnico de la edificación en sus documentos DB SI (seguridad contraincendios) y DB SUA (eliminación de barreras arquitectónicas)",
            "Ley 8/2017, de 3 de agosto, de accesibilidad universal en las Islas Baleares",
            "Ley 7/2013, de 26 de noviembre, de régimen jurídico de instalaciones, acceso y ejercicio de actividades de las Islas Baleares",
            "Ley 6/2019, de 8 de febrero, de modificación de la Ley 7/2013, de 26 de noviembre, de régimen jurídico de instalaciones de acceso i ejercicio de actividades en las Islas Baleares",
            "Llei 2/2020, de 15 d’octubre, de mesures urgents i extraordinàries per a l’impuls de l’activitat econòmica i la simplificació administrativa en l’àmbit de les administracions públiques de les illes balears per pal·liar els efectes de la crisi ocasionada per la covid-19",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
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
          direccion: "C/ Dragonera, 14 bajos puerta 2 CP 07014",
          promotor: "",
          localidad: "Palma de Mallorca",
          reglamentaciones: [
            "SITUACIÓ 2: en planta baixa amb accés directe des de la via pública; en planta baixa amb   accés directe des de la via pública i associada a planta de semisoterrani, soterrani o planta  primera.",
          ],
          superficie: "150,40 m2",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "accesibilidad y supresión de las barreras arquitectónicas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["decreto 110/2010 de 15 de octubre"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      null,
      {
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
      {
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
      {
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
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "aseos y vestuarios",
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
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Art1 11.locales de características especiales.",
            "Art1 12.ordenación de cargas.",
            "Art1 15.acometidas e instalaciones de enlace.",
            "Art1 16.instalaciones interiores y receptoras.",
            "Art1 17.receptores y puesta a tierra.",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["ITC-BT-19", "ITC-BT-20"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
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
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "ITC-BT-19",
            "ITC-BT-21",
            "ITC-BT-22",
            "ITC-BT-24",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Reglamento de señalización de los centros de trabajo, aprobado por el Real Decreto 485/1997, de 14 de del mismo.",
          ],
          superficie: "",
          "potencia electrica": "6 W",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "climatización y calefacción",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
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
      {
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
      {
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
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "instalación de extintores portátiles",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["DB-SI"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "84",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "instalación de equipos de alumbrado de emergencia protección",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "CTE DB SUA 4",
            "DB-SI 5",
            "DB-SI 6",
            "DB-SUA 1",
            "DB-SUA 2",
            "DB-SUA 3",
            "DB-SUA 4",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "instalación de equipos de alumbrado de emergencia",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "DB-SUA 5. SEGURIDAD FRENTE A RIESGO DE ALTO EMPLEO",
            "DB-SUA 6. SEGURIDAD FRENTE A RIESGO DE AHOGADO",
            "DB-SUA 7. SEGURIDAD FRENTE A RIESGO DE VEHÍCULOS EN MOVIMIENTO",
            "DB-SUA 8. SEGURIDAD FRENTE A RIESGO POR LA ACCIÓN DE LOS RAYOS",
            "DB-HE. AHORRO ENERGÉTICO",
            "DB-HE 0. LIMITACIÓN DEL CONSUMO ENERGÉTICO",
            "DB-HE 1. LIMITACIÓN DE LA DEMANDA ENERGÉTICA",
            "DB-HE 2. RENDIMIENTO DE LAS INSTALACIONES TÉRMICAS",
            "DB-HE 3. EFICIENCIA ENERGÉTICA DE INSTALACIONES DE ILUMINACIÓN",
            "DB-HE 4. CONTRIBUCIÓN SOLAR MÍNIMA DE AGUA CALIENTE SANITARIA",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      null,
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "instalación agua potable",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Instalaciones de fontanería y agua fría",
            "Normas básicas para las instalaciones interiores de suministro de agua a edificios",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
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
      {
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "emisión de contaminantes a la atmósferas",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Residuos líquidos",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "Mateu Oliver Monserrat",
          "numero colegiado o de col": "Col 433",
          "colegio profesional": "Ingeniero Industrial",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["Reglamento de Higiene y Seguridad en el trabajo"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "Junio de 2024",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "ESTUDIO BÁSICO DE SEGURIDAD Y SALUD",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["Real Decreto 1627 de 24 de Octubre de 1997"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Estudio básico seguridad y salud",
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
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["Reglamento Electrotécnico de Baja Tensión"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Las borriquetas siempre se montarán perfectamente niveladas, para evitar los riesgos por trabajar sobre superficies inclinadas.",
            "Las borriquetas de madera, estarán sanas, perfectamente encoladas y sin oscilaciones, deformaciones y roturas, para eliminar los riesgos por fallo, rotura espontánea y cimbreo.",
            "Las plataformas de trabajo se anclarán perfectamente a las borriquetas, en evitación de balanceos y otros movimientos indeseables.",
            "Las plataformas de trabajo no sobresaldrán por los laterales de las borriquetas ms. de 40 cm. para evitar el riesgo de vuelcos por basculamiento.",
            "Las borriquetas no estarán separadas -a ejes- entre siños ms. de 2,5 m. para evitar las grandes flechas, indeseables para las plataformas de trabajo, ya que aumentan los riesgos al cimbrear.",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
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
      {
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
      {
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
      {
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
          superficie: "101,3 m2",
          "potencia electrica": "1,5",
          "ocupacion numero personas": "68",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "almacén",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [],
          superficie: "46,9 m2",
          "potencia electrica": "",
          "ocupacion numero personas": "3",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Art1 11.locales de características especiales.",
            "Art1 12.ordenación de cargas.",
            "Art1 15.acometidas e instalaciones de enlace.",
            "Art1 16.instalaciones interiores y receptoras.",
            "Art1 17.receptores y puesta a tierra.",
          ],
          superficie: "150,4 m2",
          "potencia electrica": "",
          "ocupacion numero personas": "84 personas",
          "fecha del documento": "",
        },
      },
      {
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "ITC-BT-19",
            "ITC-BT-21",
            "ITC-BT-22",
            "ITC-BT-24",
          ],
          superficie: "",
          "potencia electrica": "4,2kW",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "aseo manipulación  incorrecta  en  servicio,  previa  retirada  de  los  elementos  de  protección",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["1.15.8.", "ICT-BT-29 apartado 3."],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "Pàgina 12",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Reglamento de señalización de los centros de trabajo, aprobado por el Real Decreto 485/1997, de 14 de del mismo.",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: ["DB-SI"],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "84",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "aseo CO2",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "CTE DB SUA 4",
            "DB-SI 5",
            "DB-SI 6",
            "DB-SUA 1",
            "DB-SUA 2",
            "DB-SUA 3",
            "DB-SUA 4",
            "DB-SUA 5",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo:
            "Proyecto de actividad de venta de tabaco, prensa y revistas.",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto de actividad de venta de tabaco, prensa y revistas",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "DB-HR PROTECCIÓN FRENTE AL RUIDO",
            "DB-SE AD ACCIONES A LA EDIFICACIÓN",
            "NCSC-02 NORMA DE CONSTRUCCIÓN SISMORESISTENTE",
            "DB-HS. SALUBRIDAD",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "Mateu Oliver Monserrat",
          "numero colegiado o de col": "Col 433",
          "colegio profesional": "Ingeniero Industrial",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
          direccion: "",
          promotor: "",
          localidad: "",
          reglamentaciones: [
            "Reglamento de Higiene y Seguridad en el trabajo",
            "Real Decreto 1627 de 24 de Octubre de 1997",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "Junio de 2024",
        },
      },
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "",
          "numero colegiado o de col": "",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Proyecto actividad menor despacho panadería y degustación",
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
      {
        ingeniero: {
          "nombre o apellidos": "Mateu Oliver",
          "numero colegiado o de col": "col 433",
          "colegio profesional": "",
          direccion: "",
          telefono: "",
          email: "",
        },
        proyecto: {
          titulo: "Estudio básico seguridad y salud",
          direccion: "",
          promotor: "",
          localidad: "Palma de Mallorca",
          reglamentaciones: [
            "aseo superficies inseguras y estrechas",
            "Se prohibe en general en esta obra, la utilización de escaleras de mano o de andamios sobre borriquetas, en lugares con riesgo de caida desde altura durante los trabajos de electricidad, si antes no se han instalado las protecciones de seguridad adecuadas",
            "Se prohibe durante el desarrollo de toda la obra, arrojar escombros fuera de la canalizaciones habilitadas a tal fin",
            "Al finalizar la jornada, se prohibe abandonar en el suelo, cuchillas, heramientas, grapadoras, y demás maquinaria manual, para evitar los accidentes por pisadas sobre objetos",
            "Se prohibe el uso de mecheros y sopletes junto a materiales inflamables",
            "Se prohibe abandonar los mecheros y sopletes encendidos",
            "Se controlará la dirección de la llama durante las operaciones de soldadura en evitación de incendios",
            "Los andamios utilizados durante las operaciones de mantenimiento y reparacion de locales interiores, seguirán las prescripciones dictadas para los mismos en este estudio de seguridad",
          ],
          superficie: "",
          "potencia electrica": "",
          "ocupacion numero personas": "",
          "fecha del documento": "Junio de 2024",
        },
      },
    ],
  }),

  actions: {
    testMergeJson() {
      const mergedResult = this.mergeExtractedJsonObjects(this.testResult);
      // this.responseIA = resultsIA;
      this.mergedResponseIA = mergedResult;
    },
    processmergedResponseIA() {
      const mergedResult = this.processMergedResult(this.mergedResponseIA);
      this.mergedResponseIA = mergedResult;
    },
    setPdf(url: string) {
      this.currentPdf = url;
    },
    setSDIndex(SDIndex: Record<string, string[]>) {
      this.sdIndex = SDIndex;
    },
    async sendJsonsToIA() {
      const allResults: ProjectTemplate[] = [];

      const entries = Object.entries(this.sdIndex);
      this.isSending = true;
      this.step = 0;
      for (const [key, texts] of entries) {
        for (const text of texts) {
          const result = await $fetch<ProjectTemplate>("/api/ia", {
            method: "POST",
            body: {
              inputs: {
                text: text,
                template: JSON.stringify(this.template),
              },
            },
          });
          allResults.push(result);
        }
      }
      this.step = 1;
      const results = allResults;

      console.log("results", results);
      this.isSending = false;
      // const transformedResults = results.map((result) => {
      //   if (result) {
      //     return JSON.parse(result).extracted_information;
      //   }
      //   return result;
      // });
      //#######
      // console.log("transformedResults", results);
      // const mergedResult = this.mergeExtractedJsonObjects(results);
      // console.log("mergedResult", mergedResult);
      // const processedMergedResult = this.processMergedResult(mergedResult) as {
      //   ingeniero: {
      //     "nombre o apellidos": string;
      //     "numero colegiado o de col": string;
      //     "colegio profesional": string;
      //     direccion: string;
      //     telefono: string;
      //     email: string;
      //   };
      //   proyecto: {
      //     titulo: string;
      //     direccion: string;
      //     promotor: string;
      //     localidad: string;
      //     reglamentaciones: string[];
      //     superficie: string;
      //     "potencia electrica": string;
      //     "ocupacion numero personas": string;
      //     "fecha del documento": string;
      //   };
      // };
      // console.log("processdMergedResults", processedMergedResult);
      // this.responseIA = processedMergedResult;
      // return mergedResult;
      //#########
      const resultsIA = results.map((result) => {
        if (result && typeof result[0]?.extracted_information === "string") {
          return JSON.parse(result[0].extracted_information);
        }
        return result;
      });
      const mergedResult = this.mergeExtractedJsonObjects(resultsIA);
      // this.responseIA = resultsIA;
      this.responseIA = mergedResult;
    },
    normalizeString(s: string): string {
      return s.toLowerCase().trim().replace(/\s+/g, " ");
    },
    mergeExtractedJsonObjects(
      extractedJsonObjects: Record<string, any>[]
    ): Record<string, any> {
      const store = usePDFStore();

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
            store.normalizeString(String(v))
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
        // control of null dictionary
        if (!d1) return d2 || {};
        if (!d2) return d1;

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
      const store = usePDFStore();

      function processValue(value: any): any {
        if (typeof value === "string") {
          const parts = value
            .split("#")
            .map((part) => part.trim())
            .filter(Boolean);
          if (!parts.length) return "";
          //@ts-ignore
          const normalizedParts = parts.map(store.normalizeString);
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
//// proposta de merge

// function mergeJsonArray(jsonArray: JsonObject[]): JsonObject {
//   const merged: JsonObject = {};

//   jsonArray.forEach(obj => {
//     mergeObjects(merged, obj);
//   });

//   return merged;
// }

// function mergeObjects(target: JsonObject, source: JsonObject): void {
//   for (const key in source) {
//     const sourceValue = source[key];

//     if (sourceValue === '' || sourceValue === undefined) continue;

//     if (typeof sourceValue === 'string') {
//       mergeStringField(target, key, sourceValue);
//     } else if (Array.isArray(sourceValue)) {
//       mergeStringArrayField(target, key, sourceValue);
//     } else if (typeof sourceValue === 'object' && sourceValue !== null) {
//       if (!target[key]) target[key] = {};
//       mergeObjects(target[key] as JsonObject, sourceValue);
//     }
//   }
// }

// function mergeStringField(target: JsonObject, key: string, value: string): void {
//   if (!target[key]) {
//     target[key] = { value, count: 1 };
//   } else {
//     const targetField = target[key] as { value: string; count: number };
//     if (targetField.value === value) {
//       targetField.count++;
//     } else if (targetField.count === 1) {
//       targetField.value = value;
//       targetField.count = 1;
//     }
//   }
// }

// function mergeStringArrayField(target: JsonObject, key: string, valueArray: string[]): void {
//   if (!target[key]) {
//     target[key] = countOccurrences(valueArray);
//   } else {
//     const existingArray = target[key] as { [value: string]: number };
//     const newCounts = countOccurrences(valueArray);

//     for (const val in newCounts) {
//       if (existingArray[val]) {
//         existingArray[val] += newCounts[val];
//       } else {
//         existingArray[val] = newCounts[val];
//       }
//     }
//   }
// }

// function countOccurrences(array: string[]): { [value: string]: number } {
//   const counts: { [value: string]: number } = {};
//   array.forEach(value => {
//     if (counts[value]) {
//       counts[value]++;
//     } else {
//       counts[value] = 1;
//     }
//   });
//   return counts;
// }
