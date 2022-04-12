export interface ProjectType {
  photo: ImageType;
  photos: string;
  id: string;
  title: string;
  description: string;
  year: number;
  objektAlter: ObjektAlter;
  objektType: ObjektType;
  services: ArrayOfServicesType;
  timeStamp: number;
}
export interface ImageType {
  url: string,
  title: string,
  alt: string,
}
export type ImagesType = ImageType[]

export const objektAlterArray = [
  "Newbau",
  "Sanierung",
  "Wettbewerb",
  "Alle"
] as const

export type ObjektAlter = typeof objektAlterArray[number];

export const objektTypeArray = [
  "MFH",
  "Gewerbe",
  "Büro",
  "EFH",
  "Gesundheits",
  "Sport",
  "Multifunktional",
  "Alle"] as const

export type ObjektType = typeof objektTypeArray[number];

export const ServicesArray = [
  "TU",
  "Bauleitung",
  "Architektur",
  "GP",
  "Wettbewerb",
  "Käuferbetreuung",
  "Ausführungsplanung",
  "Studien",
  "Mangelmenagement",
  "Kostenmenagement",
  "Submision",
  "Alle"
] as const
export type Services = typeof ServicesArray[number];
export type ArrayOfServicesType = Services[];

export type ProjectsListType = ProjectType[];

export interface PropsProjects {
  projectsList: ProjectsListType;
}

export type FilterParams = {
  objektAlter: ObjektAlter,
  objektType: ObjektType,
  services: Services
}

export type User = UserData | null;

export interface UserData {
  uid: string;
}



