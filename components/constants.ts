import { RegisterFieldsProps, RegisterProps } from "./interface";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
return s.replace}

export const initialValuesRegister: RegisterProps = {
    name: '',
    cpf: '',
    email: '',
    password: '',
};


export const fixValuesRegister: Record<keyof RegisterProps, RegisterFieldsProps> = {
    name: {
        placeholder: 'Digite seu nome completo',
        error: 'Nome é obrigatório',
        minLength: 3,
        label: 'Nome',
        validation: null
    }, 
    cpf: {
        placeholder: 'Digite seu CPF',
        error: 'CPF é obrigatório',
        minLength: 11,
        label: 'CPF',
        validation: null
    },
    email: {
        placeholder: 'Digite seu e-mail',
        error: 'E-mail é obrigatório',
        minLength: 5,
        label: 'E-mail',
        validation: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    },
    password: {
        placeholder: 'Digite sua senha',
        error: 'Senha é obrigatória',
        minLength: 6,
        label: 'Senha',
        validation: null
    },
}