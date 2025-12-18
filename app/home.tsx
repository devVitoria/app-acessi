import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Home() {
  const options: Record<string, React.ReactNode> = {
    "Controle Mercado": (
      <FontAwesome5 name="shopping-cart" size={24} color="#ca8a04" />
    ),
    "Lista de Compras": (
      <FontAwesome name="list-alt" size={24} color="#ca8a04" />
    ),
    "Controle Financeiro": (
      <FontAwesome6 name="money-bill-transfer" size={24} color="#ca8a04" />
    ),

    // "Anotações":
    // <Foundation name="pencil" size={24} color="#ca8a04" />,
    // "Eventos":
    // <FontAwesome name="calendar" size={24} color="#ca8a04" />,
  };
  return (
    <View className="flex-1 bg-yellow-600 items-center justify-center">
      <View className="absolute top-[5%] gap-1">
        <Text className="text-2xl font-bold text-white text-center ">
          Acessi
        </Text>
        <Text className="text-base text-white">Seu APP facilitador!</Text>
      </View>

      <View className="flex flex-1 mt-[30%] bg-white border border-gray-300 w-full rounded-t-3xl drop-shadow-lg p-10">
        <View className="flex flex-wrap flex-row w-full gap-4 justify-around">
          {Object.entries(options).map((i) => (
            <View
              key={"it" + i}
              className="h-28 w-28 rounded-md border border-yellow-200 bg-yellow-50 justify-center items-center gap-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text className="text-yellow-600 text-center">{i[0]}</Text>
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
          <Text className="text-yellow-600 mb-12">Últimas anotações</Text>
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}
            className="w-full mx-5 flex-row items-center justify-between border border-yellow-200 bg-yellow-50 h-16 rounded-md"
          >
            <View className="flex flex-row items-center gap-2 ml-2">
              {" "}
              <MaterialIcons
                name="check-box-outline-blank"
                size={36}
                color="#ca8a04"
              />
              <View className="flex flex-col">
                <Text className="text-[#ca8a04] font-bold text-base">
                  Comer um churras
                </Text>
                <Text className="text-[#ca8a04] font-semibold text-sm">
                  25/01/2025 às 17:30
                </Text>
              </View>
            </View>

            <Ionicons
              name="options"
              size={28}
              color="#ca8a04"
              className="mr-2"
            />
          </View>
        </TouchableOpacity>

        <View className="absolute bottom-20 right-6 bg-yellow-600 w-20 h-20 rounded-md flex justify-center items-center">
          <Entypo name="plus" size={30} color="white" />
        </View>
      </View>
    </View>
  );
}
