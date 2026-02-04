import { Text, TouchableOpacity, View } from "react-native";
import { HomeResourceButtonProps } from "./utils/interface";

export default function HomeResourceButton({
  onPress,
  icon,
  title,
}: HomeResourceButtonProps) {
  return (
    <TouchableOpacity
      className="flex flex-col items-center gap-2 max-w-[68px]"
      onPress={onPress}
    >
      <View className="w-16 h-16 rounded-xl border border-acessiSecondary75 justify-center items-center bg-acessiSecondary ">
        {icon}
      </View>
      <Text
        className="text-acessiPrimary text-center text-xs font-medium"
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
