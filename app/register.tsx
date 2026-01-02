import Animation from "@/components/animations/animation";
import { fixValuesRegister, initialValuesRegister } from "@/components/constants";
import { RegisterProps } from "@/components/interface";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";

export default function Register() {
  const [input, setInput] = useState<RegisterProps>(initialValuesRegister);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <View className="flex-1 bg-white items-center justify-start">
      <View className=" w-16 h-16 rounded-full bg-[#ca8a04] p-4 justify-center items-center my-6 mt-16">
        <AcessiLogo
          width={44}
          height={44}
          color="#ca8a04"
          className="absolute"
        />
      </View>

      <Text className="text-2xl font-bold text-yellow-800 text-center mb-6">
        Cadastre-se
      </Text>

      <Text className="text-base font-semibold text-yellow-600 text-center mb-6">
        Crie sua conta Acessi e tenha acesso a diversos recursos que vão
        facilitar o seu dia a dia
      </Text>

      <View className="w-11/12 h-1/2 rounded-md z-50 py-2">
        {Object.entries(input).map(([key, value]) => (
          <View className="flex flex-col gap-1">
          <Text className="px-2 text-yellow-800">{fixValuesRegister[key as keyof RegisterProps].label}</Text>
          <TextInput
            key={key}
            className={` ${input[key as keyof RegisterProps].length > 0 ? 'text-yellow-900' : 'text-yellow-200 text-sm'} border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
            onChangeText={(te) => setInput({ ...input, [key]: te })}
            placeholderTextColor={"#ca8a04"}
            value={value}
            placeholder={fixValuesRegister[key as keyof RegisterProps].placeholder+'...'}
          />
          </View>
        ))}
        <View className="flex flex-row gap-2 items-center justify-center mt-4 px-5">
          <TouchableOpacity onPress={handleAceptTerms}>
            <FontAwesome
              name={termsAccepted ? "check-square" : "square-o"}
              size={24}
              color="#854d0e"
            />
          </TouchableOpacity>
          <Text className="text-start text-sm text-yellow-800 ">
            Concordo com os <Text className="font-bold">Termos de Serviço</Text>{" "}
            e a <Text className="font-bold">Política de Privacidade</Text>.
          </Text>
        </View>
        <Text className="bg-yellow-600 text-white text-center font-bold p-4 mt-6 rounded-md">
          Cadastrar
        </Text>

        <Text className="text-center text-yellow-800 mt-4 mb-96">
          Já possui uma conta?{" "}
          <Text className="text-yellow-800 font-bold underline">
            Faça login
          </Text>
        </Text>
      </View>

      <View className="absolute bottom-0 w-full h-1/3 bg-yellow-100 rounded-t-3xl items-center justify-center">
        <Animation />
      </View>
    </View>
  );
}
