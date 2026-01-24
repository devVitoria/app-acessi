import { SendCodeReq, SendCodeRes } from "@/services/customer/interface";
import { UseMutationResult } from "@tanstack/react-query";

export interface StepMarkerProps {
  nroSteps: number;
  currentStep: boolean;
  onClick: (step: number) => void;
}

export interface StepOneProps {
  input: RegisterProps;
  setInput: (value: React.SetStateAction<RegisterProps>) => void;
  handleAceptTerms: () => void;
  termsAccepted: boolean;
  register: () => void;
}

export interface StepTwoProps {
  input: RegisterProps;
  setEmailCode: React.Dispatch<React.SetStateAction<string>>;
  sendCode: UseMutationResult<SendCodeRes, Error, SendCodeReq, unknown>;
  emailCode: string;
  setFinalized: React.Dispatch<React.SetStateAction<boolean>>;
  registered: boolean;
}
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
