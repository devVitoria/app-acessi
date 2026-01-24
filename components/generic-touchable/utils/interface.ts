import { JSX } from "react";

export interface GenericTouchableProps {
  onPress: () => void;
  children: JSX.Element | JSX.Element[];
  className?: string;
}
