export interface RegisterProps {
    name: string;
    cpf: string;
    email: string;
    password: string;
}


export interface RegisterFieldsProps {
    placeholder: string;
    error: string;
    minLength: number;
    label: string;
    validation: RegExp | null;
    mask?: string;
}