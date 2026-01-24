import { TextInput } from "react-native";
import { cn } from "../cn";
import { CustomInputProps } from "./utils/interface";

export default function CustomInput({
  className,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  keyboardType,
  maxLength,
}: CustomInputProps) {
  return (
    <TextInput
      className={cn(
        `text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`,
        className,
      )}
      onChangeText={(v) => onChangeText(v)}
      placeholderTextColor={placeholderTextColor || "#ca8a04"}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
}
