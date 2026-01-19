import { initialValuesRegister } from "@/components/constants";
import { RegisterProps } from "@/components/interface";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import PagerView from "react-native-pager-view";

import Animation from "@/components/animations/animation";
import LastStep from "@/components/register/last-step";
import StepMarker from "@/components/register/step-marker";
import StepOne from "@/components/register/step-one";
import StepTwo from "@/components/register/step-two";
import { register } from "@/services/auth";
import { sendCode } from "@/services/customer";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";

export default function Register() {
  const [input, setInput] = useState<RegisterProps>(initialValuesRegister);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [emailCode, setEmailCode] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);
  const pagerRef = useRef<PagerView>(null);
  const [minPageAllowed, setMinPageAllowed] = useState(0);

  const handleAceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  const sendRegister = useMutation({
    mutationFn: register,
    onSuccess() {
      setStep(1);
      pagerRef.current?.setPage(1);
    },
    onError: () => {
      console.log("erro");
    },
  });

  useEffect(() => {
    if (sendRegister.isSuccess) {
      setMinPageAllowed(1);
      pagerRef.current?.setPage(1);
      setStep(1);
    }
  }, [sendRegister.isSuccess]);

  const sendCodeMail = useMutation({
    mutationFn: sendCode,
    onSuccess: () => {
      ToastAndroid.show("Código enviado para o e-mail!", ToastAndroid.SHORT);
    },
  });

  const handleRegister = () => {
    sendRegister.mutate(input);
  };

  return (
    <View className="flex flex-1 bg-white justify-center items-center ">
      <View className=" w-16 h-16 rounded-full bg-[#ca8a04] p-4 justify-center items-center my-2 mt-14">
        <AcessiLogo
          width={44}
          height={44}
          color="#ca8a04"
          className="absolute"
        />
      </View>
      {isFinalized ? (
        <>
          <Text className="text-2xl font-bold text-yellow-800 text-center my-2 mt-10">
            Cadastro finalizado!
          </Text>

          <Text className="text-base px-4 font-semibold text-yellow-800 text-center ">
            Com sua conta Acessi você tem acesso a diversos recursos que vão
            facilitar o seu dia a dia
          </Text>
          <LastStep />
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold text-yellow-800 text-center mb-2">
            Cadastre-se
          </Text>

          <Text className="text-base px-4 font-semibold text-yellow-800 text-center mb-6">
            Crie sua conta Acessi e tenha acesso a diversos recursos que vão
            facilitar o seu dia a dia
          </Text>

          <StepMarker
            nroSteps={2}
            currentStep={step === 1}
            onClick={(idx: number) => {
              if (idx < minPageAllowed) return;

              pagerRef.current?.setPage(idx);
              setStep(idx);
            }}
          />

          <View className="w-11/12 rounded-md z-50 py-2 flex-1">
            <PagerView
              style={styles.container}
              ref={pagerRef}
              initialPage={step}
              onPageSelected={(e) => {
                const nextPage = e.nativeEvent.position;

                if (nextPage < minPageAllowed) {
                  pagerRef.current?.setPage(minPageAllowed);
                  return;
                }

                setStep(nextPage);
              }}
            >
              <View className="rounded-md z-50 py-2 w-full" key="1">
                <StepOne
                  handleAceptTerms={handleAceptTerms}
                  input={input}
                  setInput={setInput}
                  termsAccepted={termsAccepted}
                  register={handleRegister}
                />
              </View>
              <View style={styles.page} key="2">
                <StepTwo
                  registered={sendRegister.isSuccess}
                  sendCode={sendCodeMail}
                  input={input}
                  setFinalized={setIsFinalized}
                  setEmailCode={setEmailCode}
                  emailCode={emailCode}
                />
              </View>
            </PagerView>
          </View>
        </>
      )}
      <View className="absolute bottom-0 w-full h-1/3 rounded-t-3xl items-center justify-center z-20">
        <Animation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
