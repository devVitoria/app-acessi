import { TouchableOpacity } from "react-native";
import { GenericTouchableProps } from "./utils/interface";

export const GenericTouchable = ({
  onPress,
  children,
  className,
}: GenericTouchableProps) => {
  return (
    <TouchableOpacity
      className={
        className ??
        `p-4 rounded-md z-50 bg-acessiSecondary border border-acessiSecondary75 w-full`
      }
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default GenericTouchable;
