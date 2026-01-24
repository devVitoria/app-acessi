import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fixValuesRegister } from "./utils/constants";
import { RegisterProps, StepOneProps } from "./utils/interface";

export default function StepOne({
  input,
  setInput,
  handleAceptTerms,
  termsAccepted,
  register,
}: StepOneProps) {
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const handleDisableButton = () => {
      const isFormValid =
        Object.values(input).every((value) => value.length > 0) &&
        termsAccepted;

      setDisableButton(!isFormValid);
    };

    handleDisableButton();
  }, [input, termsAccepted]);

  return (
    <View className="w-full justify-center  bg-[#CA8A0405]  p-2 rounded-lg border-[0.08px] border-yellow-900">
      {Object.entries(input).map(([key, value]) => (
        <View className="flex flex-col gap-1" key={`input-${key}`}>
          <Text className="px-2 text-yellow-800">
            {fixValuesRegister[key as keyof RegisterProps].label}
          </Text>
          <TextInput
            className={` ${
              input[key as keyof RegisterProps].length > 0
                ? "text-yellow-900 text-base"
                : "text-yellow-200 text-sm"
            } bg-white/70 border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
            onChangeText={(te) => setInput({ ...input, [key]: te })}
            placeholderTextColor={"#ca8a04"}
            value={value}
            maxLength={fixValuesRegister[key as keyof RegisterProps].maxLength}
            keyboardType={
              fixValuesRegister[key as keyof RegisterProps]
                .keyboard as KeyboardType
            }
            placeholder={
              fixValuesRegister[key as keyof RegisterProps].placeholder
            }
          />
        </View>
      ))}
      <View className="flex flex-row gap-2 items-center justify-center px-5 mt-4">
        <TouchableOpacity
          onPress={handleAceptTerms}
          key={disableButton ? 1 : 0}
        >
          <FontAwesome
            name={termsAccepted ? "check-square" : "square-o"}
            size={24}
            color="#854d0e"
          />
        </TouchableOpacity>
        <Text className="text-start text-[12px] text-yellow-800">
          Concordo com os{" "}
          <Text className="font-bold">Termos de Serviço e Privacidade</Text>.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          opacity: disableButton ? 0.3 : 1,
        }}
        key={disableButton ? 1 : 0}
        className="p-4 rounded-md z-50 bg-acessiSecondary opacity-50 border border-acessiSecondary75 w-full shadow-lg mt-4"
        onPress={register}
        disabled={disableButton}
      >
        <Text className=" text-acessiPrimary text-center font-bold">
          Contiuar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
        className="mb-4"
      >
        <Text className="text-center text-yellow-800 mt-4 z-50">
          Já possui uma conta?{" "}
          <Text className="text-yellow-700 font-bold underline">
            Faça login
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
