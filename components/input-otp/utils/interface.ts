export interface InputOtpProps {
  setEmailCode: React.Dispatch<React.SetStateAction<string>>;
  numberOfDigits: number | undefined;
  screen?: string;
}
