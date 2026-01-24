import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import Animation from "@/components/animations/waves";
import { login } from "@/services/auth";
import { LoginRes } from "@/services/auth/interface";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import base64 from "react-native-base64";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";
import ResetPassword from "@/components/pages/login/reset-password";
import useUserStore from "@/storage/user-storage";
import { User } from "@/storage/utils/interface";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassoword] = useState(false);
  const { setUser } = useUserStore();
  const useLogin = useMutation({
    mutationFn: login,
    onSuccess: async (v: LoginRes) => {
      const token = v.token.split(".")[1];
      const decoded = base64.decode(token);

      const fixDecoded = decoded.replace("{", "").replace("}", "").split(",");
      let newJson = {};

      const fixTypesUser = (
        value: string,
      ): Record<string, string | number | boolean> => {
        return {
          cpf: value,
          email: value,
          name: value,
          userId: Number(value),
          createdAt: value,
          exp: Number(value),
          iat: Number(value),
          validated: value === "true",
        };
      };

      for (const item of fixDecoded) {
        const [key, value] = item.split(":");
        const fixKey = key.replaceAll('"', "").trim();
        const fixValue = value.replaceAll('"', "").trim();
        newJson = {
          ...newJson,
          [fixKey]: fixTypesUser(fixValue)[fixKey],
        };
      }
      await setUser(newJson as User);
      router.push("/home");
    },
    onError: (e) => {
      console.log("erro ao logar", e);
    },
  });

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className=" w-16 h-16 rounded-full bg-[#ca8a04] p-4 justify-center items-center my-6 mt-20">
        <AcessiLogo
          width={44}
          height={44}
          color="#ca8a04"
          className="absolute"
        />
      </View>

      <Text className="text-2xl font-bold text-yellow-800 text-center mb-2">
        Acesse sua conta
      </Text>

      <View className="w-11/12 rounded-md z-50 py-2 flex-1">
        <View className="flex flex-col gap-1">
          <Text className="px-2 text-yellow-800">CPF</Text>
          <TextInput
            className={`text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
            onChangeText={(te) => setCpf(te)}
            placeholderTextColor={"#ca8a04"}
            value={cpf}
            keyboardType="numeric"
            maxLength={11}
            placeholder={"000.000.000-00"}
          />
        </View>

        <View className="flex flex-col gap-1">
          <Text className="px-2 text-yellow-800">Senha</Text>

          <TextInput
            className={`text-yellow-900 text-base border border-yellow-700 rounded-lg m-2 ml-2 font-semibold p-4`}
            onChangeText={(te) => setPassword(te)}
            placeholderTextColor={"#ca8a04"}
            value={password}
            maxLength={6}
            keyboardType="numeric"
            placeholder={"******"}
          />
        </View>
        <View className="px-2 pt-4">
          <TouchableOpacity
            className="p-4  rounded-md z-50 bg-yellow-600 border border-yellow-700 w-full shadow-lg"
            onPress={() => {
              useLogin.mutate({ cpf, password });
            }}
          >
            <Text className=" text-white text-center font-bold">Entrar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/register");
          }}
        >
          <Text className="text-center text-yellow-800 mt-4 z-50">
            Não possui uma conta?{" "}
            <Text className="text-yellow-700 font-bold underline">
              Cadastre-se
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="pt-6"
          onPress={() => {
            setResetPassoword(true);
          }}
        >
          <Text className=" text-yellow-700 text-center font-bold underline">
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>

      {resetPassword && (
        <ResetPassword
          open={resetPassword}
          setOpen={setResetPassoword}
          cpfProvided={cpf.length === 11 ? cpf : undefined}
        />
      )}

      <View className="absolute bottom-0 w-full h-1/3 rounded-t-3xl items-center justify-center z-20">
        <Animation />
      </View>
    </View>
  );
}
