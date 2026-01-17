import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputOtp from "../input-otp";
import { ResetPasswordProps } from "./interface";

export default function ResetPassword({
  open,
  setOpen,
  cpfProvided = "",
}: ResetPasswordProps) {
  const [code, setCode] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <Modal visible={open} transparent animationType="slide">
      <View
        className="bg-yellow-900/30 items-center justify-center flex-1 px-8"
        onStartShouldSetResponder={() => {
          setOpen(false);
          return true;
        }}
      >
        <View
          className="w-full p-4 gap-4 bg-white rounded-lg justify-cednter items-center"
          onStartShouldSetResponder={() => {
            return false;
          }}
        >
          <Text className="font-bold text-yellow-800 text-lg">
            Recuperação de conta.
          </Text>

          <Text className=" text-yellow-800 text-center">
            {cpfProvided !== ""
              ? `Um código de recuperação foi enviado para o seu e-mail. `
              : "Informe seu CPF no campo abaixo para enviarmos um código de recuperação para seu e-mail cadastrado."}
          </Text>
          {cpfProvided === "" ? (
            <View className="flex flex-col gap-1 w-full">
              <TextInput
                className={`text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
                onChangeText={(te) => setCpf(te)}
                placeholderTextColor={"#ca8a04"}
                value={cpf}
                keyboardType="numeric"
                maxLength={11}
                placeholder={"000.000.000-00"}
              />

              <TouchableOpacity
                className=" p-2 rounded-md z-50 w-full justify-center bg-yellow-50"
                onPress={() => {
                  console.log("Chamar o envio do CPF");
                }}
              >
                <Text className=" text-yellow-700 text-center font-bold">
                  Enviar
                </Text>
              </TouchableOpacity>

              <View className="w-full bg-yellow-800 h-[0.3px] my-2"/>

               <TouchableOpacity
                className=" rounded-md z-50 w-full justify-center bg-yellow-50 border border-yellow-200 p-1"
                onPress={() => {
                  console.log("Contatar suporte");
                }}
              >
                <Text className=" text-yellow-700 text-center font-xs font-bold">
                  Contatar suporte
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className="bg-blue-100 p-1 rounded-lg">
                <Text className="text-blue-600 font-bold">
                  meuemail@teste.com.br
                </Text>
              </View>

              <View className="gap-4 px-4 justify-center items-center pt-10">
                <InputOtp setEmailCode={setCode} numberOfDigits={4} />

                <Text className="text-yellow-700 text-center text-sm">
                  Você poderá solicitar um novo código em{" "}
                  <Text className="text-yellow-700 font-bold">00:59</Text>.
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
