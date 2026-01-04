import {
  fixValuesRegister,
  initialValuesRegister,
} from "@/components/constants";
import { RegisterProps } from "@/components/interface";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import PagerView from "react-native-pager-view";

import Animation from "@/components/animations/animation";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import CatFuse from "../assets/images/catfuse.svg";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";

export default function Register() {
  const [input, setInput] = useState<RegisterProps>(initialValuesRegister);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [step, setStep] = useState(0);
  const [timeSecond, setTimeSecond] = useState(59);
  const [emailCode, setEmailCode] = useState("");

  const handleAceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  const opacityButton = disableButton ? 0.5 : 1;

  useEffect(() => {
    const handleDisableButton = () => {
      const isDisabled =
        Object.values(input).every((value) => value.length === 0) ||
        !termsAccepted ||
        emailCode.length < 4;
      setDisableButton(isDisabled);
    };

    handleDisableButton();
  }, [input, termsAccepted, step]);

  useEffect(() => {
    setTimeSecond((prev) => (prev > 0 ? prev - 1 : 59));
  }, [input.email]);

  useEffect(() => {
    if (timeSecond === 0) {
      return;
    }
    setTimeout(() => {
      setTimeSecond(timeSecond - 1);
    }, 1000);
  }, [timeSecond]);

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
        Cadastre-se
      </Text>

      <Text className="text-base px-4 font-semibold text-yellow-800 text-center mb-6">
        Crie sua conta Acessi e tenha acesso a diversos recursos que vão
        facilitar o seu dia a dia
      </Text>

      <View className="h-4 w-full flex-row items-center justify-center gap-4">
        <TouchableOpacity
          onPress={() => {
            setStep(0);
          }}
          className="bg-yellow-800 w-10 h-4 rounded-lg"
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStep(1);
          }}
          className={`${
            step === 1 ? "bg-yellow-800" : "border-yellow-800 border"
          } w-10 h-4 rounded-lg`}
        ></TouchableOpacity>
      </View>

      <View className="w-11/12 rounded-md z-50 py-2 flex-1">
        <PagerView
          style={styles.container}
          initialPage={step}
          onPageSelected={(e) => {
            const pageIndex = e.nativeEvent.position;
            setStep(pageIndex);
          }}
        >
          <View className="rounded-md z-50 py-2" key="1">
            {Object.entries(input).map(([key, value]) => (
              <View className="flex flex-col gap-1" key={key}>
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
                  placeholder={
                    fixValuesRegister[key as keyof RegisterProps].placeholder
                  }
                />
              </View>
            ))}
            <View className="flex flex-row gap-2 items-center justify-center px-5">
              <TouchableOpacity onPress={handleAceptTerms}>
                <FontAwesome
                  name={termsAccepted ? "check-square" : "square-o"}
                  size={24}
                  color="#854d0e"
                />
              </TouchableOpacity>
              <Text className="text-start text-sm text-yellow-800 ">
                Concordo com os{" "}
                <Text className="font-bold">Termos de Serviço</Text> e a{" "}
                <Text className="font-bold">Política de Privacidade</Text>.
              </Text>
            </View>

            {disableButton && (
              <Text className="text-center text-sm text-yellow-700 font-bold pt-2 ">
                Preencha os campos, conclua todas as etapas do cadastro e
                verifique os termos para concluir.
              </Text>
            )}
          </View>
          <View style={styles.page} key="2">
            {input.email.length > 0 ? (
              <View className="justify-start items-center gap-6 pt-6">
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

                <OtpInput
                  numberOfDigits={4}
                  focusColor="#854d0e"
                  autoFocus={false}
                  hideStick={true}
                  placeholder="******"
                  blurOnFilled={true}
                  disabled={false}
                  type="numeric"
                  secureTextEntry={false}
                  focusStickBlinkingDuration={500}
                  onFilled={(text) => setEmailCode(text)}
                  textInputProps={{
                    accessibilityLabel: "One-Time Password",
                  }}
                  textProps={{
                    accessibilityRole: "text",
                    accessibilityLabel: "OTP digit",
                    allowFontScaling: false,
                  }}
                  theme={{
                    containerStyle: styles.containerPin,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                  }}
                />

                <Text className="text-center font-bold text-xs text-yellow-800">
                  {" "}
                  A ação é necessária para concluir o cadastro.
                </Text>

                <Text className="text-center text-base text-yellow-800 underline">
                  Solicitar um novo código em{" "}
                  <Text className="text-center font-bold text-base text-yellow-800">
                    00:{timeSecond < 10 ? `0${timeSecond}` : timeSecond ?? ""}
                  </Text>
                  .
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-center text-xs px-4 pb-2 font-bold text-yellow-950 mt-6">
                  Insira um registro válido no campo indicado para realizar a
                  validação de e-mail.
                </Text>

                <CatFuse
                  width={124}
                  height={124}
                  color="#ca8a04"
                  className="absolute"
                />
              </>
            )}
          </View>
        </PagerView>

        <TouchableOpacity
          style={{
            opacity: opacityButton,
          }}
          className="p-4 rounded-md z-50 bg-yellow-600 opacity-50 border border-yellow-700 w-full shadow-lg"
          onPress={() => console.log("Chamar a API de cadastro")}
          disabled={disableButton}
        >
          <Text className=" text-white text-center font-bold">Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text className="text-center text-yellow-800 mt-4 z-50">
            Já possui uma conta?{" "}
            <Text className="text-yellow-700 font-bold underline">
              Faça login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 w-full h-1/3 rounded-t-3xl items-center justify-center z-20">
        <Animation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: "78%",
  },
  page: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pinCodeContainer: {
    borderWidth: 1,
    borderColor: "#ca8a04",
    width: 48,
    height: 52,
  },
  pinCodeText: {
    fontSize: 24,
    color: "#854d0e",
    fontWeight: "bold",
  },
  containerPin: {
    justifyContent: "space-around",
    width: "90%",
  },
});
