import { RegisterFieldsProps, RegisterProps } from "./interface";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.replace;
};

export const initialValuesRegister: RegisterProps = {
  name: "",
  email: "",
  cpf: "",
  password: "",
};

export const fixValuesRegister: Record<
  keyof RegisterProps,
  RegisterFieldsProps
> = {
  name: {
    placeholder: "Digite seu nome completo...",
    error: "Nome é obrigatório",
    maxLength: undefined,
    label: "Nome",
    keyboard: "default",
    validation: null,
  },
  cpf: {
    placeholder: "000.000.000-00",
    error: "CPF é obrigatório",
    maxLength: 11,
    label: "CPF",
    keyboard: "numeric",
    validation: null,
  },
  email: {
    placeholder: "seuemail@gmail.com",
    error: "E-mail é obrigatório",
    maxLength: undefined,
    label: "E-mail",
    keyboard: "email-address",

    validation: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
  },
  password: {
    placeholder: "******",
    error: "Senha é obrigatória",
    maxLength: 6,
    label: "Senha",
    keyboard: "numeric",
    validation: null,
  },
};
