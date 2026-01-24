import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import AcessiLogo from "../../../assets/images/logo-acessi-light.svg";

export default function RegisterHeader() {
  return (
    <>
      <View
        className="flex flex-row items-center mt-10 justify-between px-6 py-2 "
        style={{
          backgroundColor: "#fff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#e5e7eb",

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 0,
          elevation: 1,
        }}
      >
        <StatusBar style="dark" backgroundColor="#fff" />
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={() => router.back}>
            <Ionicons name="arrow-back" size={24} color="#854d0e70" />
          </TouchableOpacity>

          <Text className="text-yellow-800  text-lg">Cadastro</Text>
        </View>
        <View className="w-12 h-12 rounded-full bg-[#ca8a0455] border border-acessiPrimary p-4 justify-center items-center">
          <AcessiLogo width={32} height={32} color="#ca8a04" />
        </View>
      </View>
    </>
  );
}
