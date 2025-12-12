import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Foundation,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Home() {
  const options: Record<string, React.ReactNode> =  {
      "Mercado":
      <FontAwesome5 name="shopping-cart" size={24} color="#ca8a04" />,
      "Monetário":
      <FontAwesome6 name="money-bill-transfer" size={24} color="#ca8a04" />,
      "Anotações":
      <Foundation name="pencil" size={24} color="#ca8a04" />,
      "Eventos":
      <FontAwesome name="calendar" size={24} color="#ca8a04" />,
  };
  return (
    <View className="flex-1 bg-yellow-600 items-center justify-center">
      <View className="absolute top-[10%] gap-1">
        <Text className="text-2xl font-bold text-white text-center ">
          Acessi
        </Text>
        <Text className="text-base text-white">Seu APP facilitador!</Text>
      </View>

      <View className="flex flex-1 mt-[40%] bg-white border border-gray-300 w-full rounded-t-3xl drop-shadow-lg p-10">
       <View className="flex flex-wrap flex-row w-full gap-4 justify-around">
        {Object.entries(options).map((i) => (
        <View key={'it'+ i} className="h-28 w-28 rounded-md border border-yellow-200 bg-yellow-50 justify-center items-center gap-2">
          <Text className="text-yellow-600">{i[0]}</Text>
          {i[1]}
        </View>
        ))}
        </View>
        <TouchableOpacity className="w-full justify-center items-center mt-6" onPress={() => {
          router.push('/register')
        }}>
        <Text className="text-yellow-600">Ir para register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
