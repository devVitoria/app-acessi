import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function FinancialChatBtnCall() {
  // TODO depois tranformar isso aqui em componente pros prox recursos
  return (
    <TouchableOpacity
      className="flex flex-col items-center gap-2 max-w-[68px]"
      onPress={() => {
        router.push("/financial-chat");
      }}
    >
      <View className="w-16 h-16 rounded-xl border border-acessiSecondary75 justify-center items-center bg-acessiSecondary ">
        <MaterialCommunityIcons
          name="message-reply-text-outline"
          size={24}
          color="#854d0e"
        />
      </View>
      <Text
        className="text-acessiPrimary text-center text-xs font-medium"
        numberOfLines={2}
      >
        Chat{"\n"}Financeiro
      </Text>
    </TouchableOpacity>
  );
}
