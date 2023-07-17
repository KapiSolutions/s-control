import * as yup from "yup";

export type Contact = {
  clientName: string;
  email: string;
  telephone: string;
//   city: string;
  postalCode: string;
  msg: string;
};

const reqMsg = "Pole wymagane.";
export const schema = yup.object().shape({
  clientName: yup.string().required(reqMsg).max(50, "Zbyt wiele znaków."),
  email: yup.string().max(50, "Zbyt wiele znaków.").email("Niepoprawny adres e-mail"),
  telephone: yup.string().required(reqMsg).min(9, "Niepoprawny numer telefonu").max(15, "Zbyt wiele znaków."),
//   city: yup.string().required(reqMsg).max(20, "Zbyt wiele znaków."),
  postalCode: yup.string().required(reqMsg).max(7, "Zbyt wiele znaków."),
  msg: yup.string().max(500, "Zbyt wiele znaków."),
});
