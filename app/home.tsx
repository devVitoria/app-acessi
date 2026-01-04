import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Home() {
  const options: Record<string, React.ReactNode> = {
    "Controle Mercado": (
      <FontAwesome5 name="shopping-cart" size={24} color="white" />
    ),
    "Lista de Compras": (
      <FontAwesome name="list-alt" size={24} color="white" />
    ),
    "Controle Financeiro": (
      <FontAwesome6 name="money-bill-transfer" size={24} color="white" />
    ),
  };
  return (
    <View className="flex-1 bg-yellow-600 items-center justify-center ">
      <View className="absolute top-[5%] gap-1">
        <Text className="text-3xl font-bold text-white text-center ">
          Acessi
        </Text>
        <Text className="text-sm font-bold text-white">Seu APP facilitador!</Text>
      </View>

      <View className="flex mx-4 flex-1 mt-[30%] bg-white border border-gray-300 w-full rounded-t-3xl  drop-shadow-lg p-10">
        <View className="flex flex-wrap flex-row w-full gap-4 justify-around">
          {Object.entries(options).map((i) => (
            <View
              key={"it" + i}
              className="h-16 w-16 rounded-full bg-yellow-700 justify-center items-center gap-2"
                 style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {i[1]}
            </View>
          ))}
        </View>
        <TouchableOpacity
          className="w-full justify-center items-center mt-12"
          onPress={() => {
            router.push("/register");
          }}
        >
 
        </TouchableOpacity>
      </View>
    </View>
  );
}
