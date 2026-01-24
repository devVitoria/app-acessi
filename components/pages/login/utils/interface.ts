import { LoginRes } from "@/services/auth/interface";
import { User } from "@/storage/utils/interface";
import React, { JSX } from "react";

export interface ResetPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cpfProvided?: string;
}

export interface LoginSuccessProps {
  data: LoginRes;
  setUser: (user: User) => Promise<void>;
}

export interface LoginButtonProps {
  onPress: () => void;
  className?: string;
  children: JSX.Element | JSX.Element[];
}
