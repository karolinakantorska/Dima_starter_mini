export const dima = `DIMA Partner | Architektur & Totalunternehmung`;

export interface ProjectType {
  photo: ImageType;
  photos: ImageType[];
  photoAuthor?: string;
  id: string;
  title: string;
  description: string;
  year: number;
  objektAlter: ObjektAlter;
  objektType: ObjektTypes;
  services: ArrayOfServicesType;
  timeStamp: number;
  region: Regionen;
  phase: ArrayOfPhases;
  client: string;
  size: number;
  architect: Company;
  cooperation?: {
    service: Services | string;
    company: Company;
  };
  location: string;
  constructionVideo?: string;
  video?: string;
}
export type ProjectsListType = ProjectType[];

export interface PropsProjects {
  projectsList: ProjectsListType;
}

export interface ImageType {
  url: string;
  title: string;
  alt: string;
}
export type ImagesType = ImageType[];

export type Company = string | typeof dima | typeof Cadosch | typeof Kgp_Immobilien | typeof privat;

export const regionenArray = [
  'Glarus',
  'Zürich',
  'Arosa',
  'Andere Regionen',
  'Alle',
] as const;
export type Regionen = typeof regionenArray[number];

export const objektAlterArray = ['Newbau', 'Sanierung', 'Alle'] as const;
export type ObjektAlter = typeof objektAlterArray[number];

export const phaseArray = ['Entwicklung', 'Plannung', 'Realisierung', 'Alle'] as const;
export type Phase = typeof phaseArray[number];
export type ArrayOfPhases = Phase[];

export const objektTypeArray = [
  'MFH',
  'Gewerbe',
  'Büro',
  'EFH',
  'Gesundheits',
  'Sport',
  'Multifunktional',
  'Alle',
] as const;

export type ObjektType = typeof objektTypeArray[number];
export type ObjektTypes = ObjektType[];
export const ServicesArray = [
  'TU',
  'Bauleitung',
  'Architektur',
  'GP',
  'Wettbewerb',
  'Käuferbetreuung',
  'Ausführungsplanung',
  'Studien',
  'Mangelmenagement',
  'Kostenmenagement',
  'Submision',
  'Alle',
] as const;
export type Services = typeof ServicesArray[number];
export type ArrayOfServicesType = Services[];

export type FilterParams = {
  phase: Phase;
  region: Regionen;
};

export type User = UserData | null;

export interface UserData {
  uid: string;
}

export const Cadosch = `Cadosch & Zimmermann GmbH, Zürich`;
export const Kgp_Immobilien = `KPG Immobilien AG, Wollerau`;
export const Hanimann_Naef = `Hanimann - Flückiger AG, Egg | Naef Partner AG, Zürich`;
export const Viste = `VISTE Bautrocknung GmbH, Glarus`;
export const BSS_M = `BSS&M Real Estate AG, Zurich`
export const privat = `privat`;


