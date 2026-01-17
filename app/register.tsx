import { initialValuesRegister } from "@/components/constants";
import { RegisterProps } from "@/components/interface";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import PagerView from "react-native-pager-view";


import Animation from "@/components/animations/animation";
import StepMarker from "@/components/register/step-marker";
import StepOne from "@/components/register/step-one";
import StepTwo from "@/components/register/step-two";
import { register } from "@/services/auth";
import { router } from "expo-router";
import AcessiLogo from "../assets/images/logo-acessi-light.svg";
import "../global.css";

export default function Register() {
  const [input, setInput] = useState<RegisterProps>(initialValuesRegister);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [step, setStep] = useState(0);
  const [timeSecond, setTimeSecond] = useState(60);
  const [emailCode, setEmailCode] = useState("");

  const handleAceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };
  const [alterStepBtn, setAlterStepBtn] = useState(0);

  const sendRegister = useMutation({
    mutationFn: register,
    onSuccess() {
      setInput(initialValuesRegister)
      ToastAndroid.show('A conta foi registrada! Redirecionando para Login...', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push("/login")
      }, 1000);
    },
    onError: (e) => {
      console.log("erro", e);
    },
  });
 
  const handleRegister = () => {
    sendRegister.mutate(input);
  };

  useEffect(() => {
    const handleDisableButton = () => {
      const isDisabled = Object.values(input).every(
        (value) => value.length === 0
      );
      setDisableButton(isDisabled);
    };

    handleDisableButton();
  }, [input]);

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
    <View className="flex flex-1 bg-white justify-center items-center ">
      <View className=" w-16 h-16 rounded-full bg-[#ca8a04] p-4 justify-center items-center my-6 mt-12">
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

      <StepMarker
        nroSteps={2}
        currentStep={step === 1}
        onClick={(idx: number) => {
          setAlterStepBtn(idx);
          setStep(idx);
        }}
      />

      <View className="w-11/12 rounded-md z-50 py-2 flex-1">
        <PagerView
          style={styles.container}
          key={alterStepBtn}
          initialPage={step}
          onPageSelected={(e) => {
            const pageIndex = e.nativeEvent.position;
            setStep(pageIndex);
          }}
        >
          <View className="rounded-md z-50 py-2 w-full" key="1">
            <StepOne
              disableButton={disableButton}
              handleAceptTerms={handleAceptTerms}
              input={input}
              setInput={setInput}
              termsAccepted={termsAccepted}
              register={handleRegister}
            />
          </View>
          <View style={styles.page} key="2">
            <StepTwo
              input={input}
              setEmailCode={setEmailCode}
              timeSecond={timeSecond}
            />
          </View>
        </PagerView>
      </View>
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
