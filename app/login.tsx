import Animation from "@/components/animations/waves";
import GenericTouchable from "@/components/generic-touchable";
import CustomInput from "@/components/input";
import ResetPassword from "@/components/pages/login/reset-password";
import {
  inputTypes,
  loginSuccess,
} from "@/components/pages/login/utils/constants";
import { LoginButtonProps } from "@/components/pages/login/utils/interface";
import { login } from "@/services/auth";
import { LoginRes } from "@/services/auth/interface";
import useUserStore from "@/storage/user-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";

export default function Login() {
  const { setUser } = useUserStore();

  const [resetPassword, setResetPassoword] = useState(false);
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");

  const useLogin = useMutation({
    mutationFn: login,
    onSuccess: async (data: LoginRes) => {
      await loginSuccess({ data, setUser });
    },
    onError: (e) => {
      console.log("erro ao logar", e);
    },
  });

  const loginButtons: LoginButtonProps[] = [
    {
      className: undefined,
      onPress: () => {
        useLogin.mutate({ cpf, password });
      },
      children: (
        <Text className="text-acessiPrimary text-center font-bold">Entrar</Text>
      ),
    },
    {
      className: "",
      onPress: () => {
        router.push("/register");
      },
      children: (
        <Text className="text-center text-yellow-800 mt-4 z-50">
          Não possui uma conta?{" "}
          <Text className="text-yellow-700 font-bold underline">
            Cadastre-se
          </Text>
        </Text>
      ),
    },
    {
      className: "pt-2",
      onPress: () => {
        setResetPassoword(true);
      },
      children: (
        <Text className="text-yellow-700 text-center font-bold underline">
          Esqueci minha senha
        </Text>
      ),
    },
  ];

  return (
    <View className="flex-1 bg-white justify-center items-center gap-2 pt-6">
      <View className="w-14 h-14  rounded-full bg-[#854d0e] p-4 justify-center items-center">
        <AcessiLogo width={32} height={32} color="#ca8a04" />
      </View>

      <Text className="text-xl font-bold text-acessiPrimary text-center px-32">
        Acesse sua conta Acessi
      </Text>

      <Text className="text-center px-4 text-sm text-[#85623a] pt-4">
        Inicie sua sessão preenchendo os campos abaixo com as suas credenciais
      </Text>

      <View className="w-full px-6 rounded-md z-50 py-2 gap-4 flex-1">
        {inputTypes({ setCpf, cpf, setPassword, password }).map((input) => (
          <View className="flex flex-col gap-1" key={input.label}>
            <Text className="px-2 text-yellow-800">{input.label}</Text>
            <CustomInput
              onChangeText={input.setter}
              value={input.value}
              keyboardType={input.keyboarType}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
            />
          </View>
        ))}

        {loginButtons.map((button, idx) => (
          <GenericTouchable
            key={idx.toString() + button.onPress.toString()}
            onPress={button.onPress}
            className={button.className}
          >
            {button.children}
          </GenericTouchable>
        ))}
      </View>

      {resetPassword && (
        <ResetPassword
          open={resetPassword}
          setOpen={setResetPassoword}
          cpfProvided={cpf?.length === 11 ? cpf : undefined}
        />
      )}

      <View className="absolute bottom-0 w-full h-1/5 items-center justify-center z-20">
        <Animation />
      </View>
    </View>
  );
}
