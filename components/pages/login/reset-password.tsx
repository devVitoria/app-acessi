import { resetPassword, sendCode, verifyCode } from "@/services/customer";
import { SendCodeRes } from "@/services/customer/interface";
import { Entypo } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { ResetPasswordProps } from "./utils/interface";
import InputOtp from "@/components/input-otp";

export default function ResetPassword({
  open,
  setOpen,
  cpfProvided = "",
}: ResetPasswordProps) {
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timeCode, setTimeCode] = useState(60);
  const [senderDaa, setSenderData] = useState<SendCodeRes | null>();
  const [cpf, setCpf] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [newPsw, setNewPsw] = useState("");
  const [confirmNewPsw, setConfirmNewPsw] = useState("");

  useEffect(() => {
    if (timeCode <= 0 || timeCode === 60) return;

    const intervalId = setInterval(() => {
      setTimeCode((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeCode]);

  const sendCodeMail = useMutation({
    mutationFn: sendCode,
    onSuccess: (v) => {
      setShowCodeInput(true);
      setSenderData(v);
    },
    onError: (v) => {
      ToastAndroid.show(
        `Erro ao enviar código para o seu e-mail ${v}`,
        ToastAndroid.LONG,
      );
    },
  });

  const verifyCodeMail = useMutation({
    mutationFn: verifyCode,
    onSuccess: (v) => {
      setValidCode(true);
    },
    onError: (v) => {
      ToastAndroid.show(`Erro ao verificar código ${v}`, ToastAndroid.LONG);
    },
  });

  const resetPsw = useMutation({
    mutationFn: resetPassword,
    onSuccess: (v) => {
      ToastAndroid.show("Sua senha foi alterada", ToastAndroid.SHORT);
      setOpen(false);
    },
    onError: (v) => {
      ToastAndroid.show(
        `Ocorreu um erro ao alterar sua senha ${v}`,
        ToastAndroid.LONG,
      );
    },
  });

  useEffect(() => {
    if (cpfProvided !== "") {
      try {
        sendCodeMail.mutate({ cpf: cpfProvided });
        setTimeCode((prev) => prev - 1);
      } catch (v) {
        ToastAndroid.show(
          `Ocorreu um erro no envio do código ${v}`,
          ToastAndroid.LONG,
        );
      }
    }
  }, []);

  useEffect(() => {
    if (code.length === 4) {
      try {
        verifyCodeMail.mutate({
          code,
          cpf: cpf ?? cpfProvided,
        });
      } catch (v) {
        ToastAndroid.show(
          `Ocorreu um erro ao verificar o código ${v}`,
          ToastAndroid.LONG,
        );
      }
    }
  }, [code]);

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
              : !validCode
                ? "Uma nova senha pode ser cadastrada, a senha deve ser númerica e conter 6 dígitos."
                : "Informe seu CPF no campo abaixo para enviarmos um código de recuperação para seu e-mail cadastrado."}
          </Text>
          {cpfProvided === "" || !showCodeInput ? (
            <View className="flex flex-col gap-2 w-full px-2">
              <TextInput
                className={`text-yellow-900 text-base border border-yellow-700 rounded-lg font-semibold p-4`}
                onChangeText={(te) => setCpf(te)}
                placeholderTextColor={"#ca8a04"}
                value={cpf}
                keyboardType="numeric"
                maxLength={11}
                placeholder={"000.000.000-00"}
              />

              <TouchableOpacity
                className=" p-2 rounded-md z-50 w-full justify-center "
                onPress={() => {
                  if (cpf.length === 11) {
                    try {
                      sendCodeMail.mutate({ cpf: cpf });
                    } catch (v) {
                      ToastAndroid.show(
                        `Ocorreu um erro ao verificar o CPF ${v}`,
                        ToastAndroid.LONG,
                      );
                    }
                  }
                }}
              >
                <Text className="text-yellow-800 text-center font-bold">
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          ) : !validCode ? (
            <>
              <View className="bg-blue-100 p-1 rounded-lg px-4 flex flex-row justify-between gap-1 items-center">
                <Entypo name="mail" size={16} color="#2563eb" />
                <Text className="text-blue-600 font-bold text-sm">
                  {senderDaa?.receiver}
                </Text>
              </View>

              <View className="gap-4 px-4 justify-center items-center pt-2">
                <InputOtp
                  setEmailCode={setCode}
                  numberOfDigits={4}
                  screen="reset-psw"
                />
                {timeCode === 0 ? (
                  <TouchableOpacity
                    className=" p-2 rounded-md z-50 w-full justify-center"
                    onPress={() => {
                      if (newPsw.length === 6 && newPsw === confirmNewPsw) {
                        try {
                          sendCodeMail.mutate({
                            cpf: cpf ?? cpfProvided,
                          });
                        } catch (v) {
                          ToastAndroid.show(
                            `Ocorreu um erro ao reenviar o seu código ${v}`,
                            ToastAndroid.LONG,
                          );
                        }
                      }
                    }}
                  >
                    <Text className=" text-yellow-700 underline text-center font-bold">
                      Reenviar código
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-yellow-700 text-center text-sm">
                    Você poderá solicitar um novo código em{" "}
                    <Text className="text-blue-600 font-bold text-sm bg-blue-50 rounded-sm">
                      {timeCode}
                    </Text>
                    .
                  </Text>
                )}
              </View>
            </>
          ) : (
            <View className="flex flex-col w-full">
              <Text className="text-sm font-bold text-yellow-700 ml-2">
                Nova senha
              </Text>
              <TextInput
                className={`text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
                onChangeText={(te) => setNewPsw(te)}
                placeholderTextColor={"#ca8a04"}
                value={newPsw}
                keyboardType="numeric"
                maxLength={11}
                placeholder={"******"}
              />
              <Text className="text-sm font-bold text-yellow-700 ml-2 pt-2">
                Confirmar nova senha
              </Text>

              <TextInput
                className={`text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
                onChangeText={(te) => setConfirmNewPsw(te)}
                placeholderTextColor={"#ca8a04"}
                value={confirmNewPsw}
                keyboardType="numeric"
                maxLength={11}
                placeholder={"******"}
              />
              <TouchableOpacity
                className=" p-2 rounded-md z-50 w-full justify-center"
                onPress={() => {
                  if (newPsw.length === 6 && newPsw === confirmNewPsw) {
                    try {
                      resetPsw.mutate({
                        cpf: cpf ?? cpfProvided,
                        newPsd: newPsw,
                      });
                    } catch (v) {
                      ToastAndroid.show(
                        `Ocorreu um erro ao alterar sua senha ${v}`,
                        ToastAndroid.LONG,
                      );
                    }
                  }
                }}
              >
                <Text className=" text-yellow-700 text-center font-bold">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
