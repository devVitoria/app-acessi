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

export type User = {
  userId: number;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
  validated: boolean;
  exp: number;
  iat: number;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
};
