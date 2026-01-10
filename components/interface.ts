export interface RegisterProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
}


export interface RegisterFieldsProps {
    placeholder: string;
    error: string;
    minLength: number;
    label: string;
    validation: RegExp | null;
    keyboard: string;
    mask?: string;
}