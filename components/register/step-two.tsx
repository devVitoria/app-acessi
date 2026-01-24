import { verifyCode } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CatFuse from "../../assets/images/catfuse.svg";
import InputOtp from "../input-otp";
import { StepTwoProps } from "./utils/interface";

export default function StepTwo({
  input,
  setEmailCode,
  sendCode,
  emailCode,
  setFinalized,
  registered,
}: StepTwoProps) {
  const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email);
  const disableButton = emailCode.length < 4;
  const [timeSecond, setTimeSecond] = useState(60);

  useEffect(() => {
    if (timeSecond === 0) {
      return;
    }
    setTimeout(() => {
      setTimeSecond(timeSecond - 1);
    }, 1000);
  }, [timeSecond]);

  const verifyCodeMail = useMutation({
    mutationFn: verifyCode,
    onSuccess: (v) => {
      ToastAndroid.show(
        "E-mail verificado com sucesso! Você já pode fazer login.",
        ToastAndroid.SHORT,
      );
      setFinalized(true);
    },
    onError: (v) => {
      ToastAndroid.show(`Código inválido: ${v}`, ToastAndroid.LONG);
    },
  });

  useEffect(() => {
    if (validMail && registered) {
      sendCode.mutate({ cpf: input.cpf });
      setTimeSecond((prev) => prev - 1);
    }
  }, []);

  useEffect(() => {
    if (emailCode.length === 4) {
      verifyCodeMail.mutate({ cpf: input.cpf, code: emailCode });
    }
  }, [emailCode]);

  return validMail ? (
    <View className="flex flex-1 justify-start items-center gap-6 pt-6">
      <Text className="text-center text-lg font-bold text-yellow-800">
        Validação de e-mail
      </Text>
      <Text className="text-center text-base text-yellow-800">
        Um código será enviado para o seu e-mail{" "}
        <Text className="text-center font-bold text-base text-yellow-800">
          {input.email}
        </Text>
        .
      </Text>

      <InputOtp setEmailCode={setEmailCode} numberOfDigits={4} />

      <Text className="text-center font-bold text-xs text-yellow-800">
        {" "}
        A ação é necessária para concluir o cadastro.
      </Text>

      <TouchableOpacity
        style={{
          opacity: disableButton ? 0.3 : 1,
        }}
        key={disableButton ? 1 : 0}
        className="p-4 rounded-md z-50 bg-yellow-600 opacity-50 border border-yellow-700 w-full shadow-lg mt-4"
        onPress={() => {
          sendCode.mutate({ cpf: input.cpf });
        }}
        disabled={disableButton}
      >
        <Text className=" text-white text-center font-bold">Enviar</Text>
      </TouchableOpacity>

      {timeSecond > 0 ? (
        <Text className="text-center text-base text-yellow-800">
          Solicitar um novo código em{" "}
          <Text className="font-bold">
            00:{timeSecond.toString().padStart(2, "0")}
          </Text>
        </Text>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setTimeSecond(60);
            sendCode.mutate({ cpf: input.cpf });
          }}
        >
          <Text className="text-center text-base text-yellow-700 font-bold underline">
            Solicitar novo código
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <>
      <Text className="text-center text-xs px-24 pb-2 font-bold text-yellow-950 mt-12">
        Insira um registro válido no campo indicado para realizar a validação de
        e-mail.
      </Text>

      <CatFuse width={124} height={124} color="#ca8a04" className="absolute" />
    </>
  );
}
