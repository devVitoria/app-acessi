import { Text, View } from "react-native";
import "../global.css";

export default function Register() {
  return (
    <View className="flex-1 bg-yellow-600 items-center justify-center">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        Cadastre-se
      </Text>

      <Text className="text-base text-white text-center mb-6">
        Crie sua conta Acessi e tenha acesso a diversos recursos que vão
        facilitar o seu dia a dia
      </Text>


      <View className="w-11/12 h-1/2 bg-yellow-50 rounded-md"></View>
    </View>
  );
}
