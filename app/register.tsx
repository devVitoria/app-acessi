import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ToastAndroid, View } from "react-native";
import PagerView from "react-native-pager-view";

import Animation from "@/components/animations/waves";
import RegisterHeader from "@/components/pages/register/register-header";
import StepOne from "@/components/pages/register/step-one";
import StepTwo from "@/components/pages/register/step-two";
import {
  initialValuesRegister,
  styles,
} from "@/components/pages/register/utils/constants";
import { RegisterProps } from "@/components/pages/register/utils/interface";
import { register } from "@/services/auth";
import { sendCode } from "@/services/customer";
import "../global.css";

export default function Register() {
  const [input, setInput] = useState<RegisterProps>(initialValuesRegister);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const [minPageAllowed, setMinPageAllowed] = useState(0);
  const [step, setStep] = useState(0);

  const [emailCode, setEmailCode] = useState("");

  const pagerRef = useRef<PagerView>(null);

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

  const mainContentRegister = () => {
    return (
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
        <View
          className="flex-1 justify-start items-center rounded-md z-50 w-full"
          key="1"
        >
          <StepOne
            handleAceptTerms={handleAceptTerms}
            input={input}
            setInput={setInput}
            termsAccepted={termsAccepted}
            register={handleRegister}
          />
        </View>
        <View
          className="flex-1 justify-start items-center rounded-md z-50 w-full"
          key="2"
        >
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
    );
  };

  const height = Dimensions.get("window").height / 16;
  console.log("hei", height);
  return (
    <View className="flex flex-1 bg-white justify-center items-center pt-36">
      <RegisterHeader
        isFinalized={isFinalized}
        minPageAllowed={minPageAllowed}
        pagerRef={pagerRef}
        setStep={setStep}
        step={step}
      >
        {mainContentRegister()}
      </RegisterHeader>

      <View className="absolute bottom-0 w-full h-1/5 items-center justify-center z-20">
        <Animation />
      </View>
    </View>
  );
}
