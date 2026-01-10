import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { KeyboardType, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fixValuesRegister } from "../constants";
import { RegisterProps } from "../interface";
import { StepOneProps } from "./interface";

export default function StepOne({
  input,
  setInput,
  handleAceptTerms,
  termsAccepted,
  disableButton,
  register,
}: StepOneProps) {
  return (
    <View className="bg-white/70  p-2 rounded-lg border-[0.05px] border-yellow-800">
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
            } border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
            onChangeText={(te) => setInput({ ...input, [key]: te })}
            placeholderTextColor={"#ca8a04"}
            value={value}
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
        <TouchableOpacity onPress={handleAceptTerms}>
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

      {disableButton && (
        <Text className="text-center text-sm text-yellow-700 pt-2 ">
          Preencha os campos, conclua todas as etapas do cadastro e verifique os
          termos para concluir.
        </Text>
      )}

      <TouchableOpacity
        style={{
          opacity: disableButton ? 0.3 : 1,
        }}
        key={disableButton ? 1 : 0}
        className="p-4 rounded-md z-50 bg-yellow-600 opacity-50 border border-yellow-700 w-full shadow-lg mt-4"
        onPress={register}
        disabled={disableButton}
      >
        <Text className=" text-white text-center font-bold">Cadastrar</Text>
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
