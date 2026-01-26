import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function FinancialChat() {
  return (
    <View className="flex-1 justify-center items-center bg-acessiSecondary px-6">
      <View className="flex flex-row h-16 w-full bg-[#854d0e77] justify-between items-center px-4 rounded-xl bottom-10 absolute">
        <TextInput
          className="text-acessiPrimary text-lg"
          placeholderTextColor="#fff"
          placeholderClassName="font-bold"
          placeholder="Digite algo..."
        />
        <Ionicons name="send-sharp" size={24} color="white" />
      </View>
    </View>
  );
}
