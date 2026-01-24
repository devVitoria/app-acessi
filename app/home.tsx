import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-acessiSecondary items-center justify-center px-2 ">
      <View className="absolute top-8 gap-1">
        <Text className="text-3xl font-bold text-acessiPrimary text-center ">
          Acessi
        </Text>
        <Text className="text-sm font-bold text-acessiPrimary">
          Seu APP facilitador!
        </Text>
      </View>

      <View className="flex flex-1 mt-32 bg-white border border-acessiSecondary75 w-full rounded-t-3xl  drop-shadow-lg p-10" />
    </View>
  );
}
