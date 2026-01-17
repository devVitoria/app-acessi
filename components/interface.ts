export interface RegisterProps {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export interface RegisterFieldsProps {
  placeholder: string;
  error: string;
  maxLength: number | undefined;
  label: string;
  validation: RegExp | null;
  keyboard: string;
  mask?: string;
}

export interface InputOtpProps {
  setEmailCode: React.Dispatch<React.SetStateAction<string>>;
  numberOfDigits: number | undefined;
  screen?: string;
}
