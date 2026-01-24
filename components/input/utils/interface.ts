export interface CustomInputProps {
  className?: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
}

export interface LoginInputTypesProps {
  setCpf: (v: string) => void;
  cpf: string;
  setPassword: (v: string) => void;
  password: string;
}
export interface LoginInputTypes {
  label: string;
  setter: (v: string) => void;
  value: string;
  keyboarType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
  placeholder?: string;
}
