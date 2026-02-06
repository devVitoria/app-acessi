import {
  LoginInputTypes,
  LoginInputTypesProps,
} from "@/components/input/utils/interface";
import { router } from "expo-router";
import {
  parseListUserTokenToJson,
  transformStringTokenToDecriptedList,
} from "./functions";
import { LoginSuccessProps } from "./interface";

export const loginSuccess = async ({ data, setUser }: LoginSuccessProps) => {
  const result = transformStringTokenToDecriptedList(data?.token);

  const jsonUser = parseListUserTokenToJson(result?.listToken, result?.token);

  await setUser(jsonUser);
  router.push("/home");
};

export const inputTypes = ({
  setCpf,
  cpf,
  setPassword,
  password,
}: LoginInputTypesProps): LoginInputTypes[] => [
  {
    label: "CPF",
    setter: setCpf,
    value: cpf,
    keyboarType: "numeric",
    maxLength: 14,
    placeholder: "000.000.000-00",
  },
  {
    label: "Senha",
    setter: setPassword,
    value: password,
    keyboarType: "numeric",
    maxLength: 6,
    placeholder: "******",
  },
];
