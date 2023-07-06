import * as yup from "yup";

export const initValues = {
  title: "",
  mainImage: "",
  realizationDate: null,
  publishedDate: new Date(),
  author: "S-control",
  description: "",
  atrPower: "",
  atrType: "",
  atrPanels: "",
  atrInverter: "",
  atrPump: "",
  atrLocalization: "",
  images: "",
  tags: "",
};

export type Realization = {
  _id?: string;
  title: string;
  mainImage: string;
  realizationDate: null | Date;
  publishedDate: null | Date;
  author: string;
  description: string;
  atrPower: string;
  atrType: string;
  atrPanels: string;
  atrInverter: string;
  atrPump: string;
  atrLocalization: string;
  images: string;
  tags: string;
};
export interface Realizations extends Array<Realization> {}

const reqMsg = "Pole wymagane.";
const limitMsg = "Zbyt wiele znaków.";
const maxLength = 1000;

export const schema = yup.object().shape({
  title: yup.string().required(reqMsg).max(maxLength, limitMsg),
  mainImage: yup.string().required(reqMsg).max(maxLength, limitMsg),
  realizationDate: yup.date().default(() => new Date()),
  publishedDate: yup.date().default(() => new Date()),
  author: yup.string().required(reqMsg).max(maxLength, limitMsg),
  description: yup.string().required(reqMsg).max(maxLength, limitMsg),
  atrPower: yup.string().max(maxLength, limitMsg),
  atrType: yup.string().max(maxLength, limitMsg),
  atrPanels: yup.string().max(maxLength, limitMsg),
  atrInverter: yup.string().max(maxLength, limitMsg),
  atrPump: yup.string().max(maxLength, limitMsg),
  atrLocalization: yup.string().max(maxLength, limitMsg),
  images: yup.string().max(maxLength, limitMsg),
  tags: yup.string().max(maxLength, limitMsg),
});
