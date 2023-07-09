import * as yup from "yup";

export const initValues = {
  title: "",
  author: "S-control",
  atrType: "",
  atrLocalization: "",
  atrPower: "",
  atrPanels: "",
  atrInverter: "",
  atrPump: "",
  atrBattery: "",
  tags: "",
  realizationDate: null,
  publishedDate: new Date(),
  mainImage: "",
  images: "",
  description: "",
  prvClientName: "",
  prvClientEmail: "",
  prvClientTelephone: "",
  prvClientAddress: "",
  prvComments: "",
};

export type Realization = {
  _id?: string;
  title: string;
  author: string;
  atrType: string;
  atrLocalization: string;
  atrPower: string;
  atrPanels: string;
  atrInverter: string;
  atrPump: string;
  atrBattery: string;
  tags: string;
  realizationDate: null | Date;
  publishedDate: null | Date;
  mainImage: string;
  images: string;
  description: string;
  prvClientName: string;
  prvClientEmail: string;
  prvClientTelephone: string;
  prvClientAddress: string;
  prvComments: string;
};
export interface Realizations extends Array<Realization> {}

const reqMsg = "Pole wymagane.";
const limitMsg = "Zbyt wiele znaków.";
const maxLength = 1000;

export const schema = yup.object().shape({
  title: yup.string().required(reqMsg).max(maxLength, limitMsg),
  author: yup.string().required(reqMsg).max(maxLength, limitMsg),
  atrType: yup.string().max(maxLength, limitMsg),
  atrLocalization: yup.string().required(reqMsg).max(maxLength, limitMsg),
  atrPower: yup.string().max(maxLength, limitMsg),
  atrPanels: yup.string().max(maxLength, limitMsg),
  atrInverter: yup.string().max(maxLength, limitMsg),
  atrPump: yup.string().max(maxLength, limitMsg),
  atrBattery: yup.string().max(maxLength, limitMsg),
  tags: yup.string().max(maxLength, limitMsg),
  realizationDate: yup
    .date()
    .required(reqMsg)
    .default(() => new Date()),
  publishedDate: yup
    .date()
    .required(reqMsg)
    .default(() => new Date()),
  mainImage: yup.string().required(reqMsg).max(maxLength, limitMsg),
  images: yup.string().max(maxLength, limitMsg),
  description: yup.string().required(reqMsg).max(maxLength, limitMsg),
  prvClientName: yup.string().max(maxLength, limitMsg),
  prvClientEmail: yup.string().max(maxLength, limitMsg),
  prvClientTelephone: yup.string().max(maxLength, limitMsg),
  prvClientAddress: yup.string().max(maxLength, limitMsg),
  prvComments: yup.string().max(maxLength, limitMsg),
});
