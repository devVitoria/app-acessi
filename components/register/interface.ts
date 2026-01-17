import { SendCodeReq, SendCodeRes } from "@/services/customer/interface";
import { UseMutationResult } from "@tanstack/react-query";
import { RegisterProps } from "../interface";

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
