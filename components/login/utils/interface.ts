import React, { Dispatch } from "react";

export interface ResetPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cpfProvided?: string;
}
