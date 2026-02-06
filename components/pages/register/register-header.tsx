import { Dimensions, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import LastStep from "./last-step";
import StepMarker from "./step-marker";

interface RegisterHeaderProps {
  isFinalized: boolean;
  setStep: (value: React.SetStateAction<number>) => void;
  minPageAllowed: number;
  pagerRef: React.RefObject<PagerView | null>;
  step: number;
  children: React.ReactNode;
}
export default function RegisterHeader({
  isFinalized,
  minPageAllowed,
  pagerRef,
  setStep,
  step,
  children,
}: RegisterHeaderProps) {
  if (isFinalized) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-yellow-800 text-center my-2 mt-10">
          Cadastro finalizado!
        </Text>

        <Text className="text-base px-4 font-semibold text-yellow-800 text-center ">
          Com sua conta Acessi você tem acesso a diversos recursos que vão
          facilitar o seu dia a dia
        </Text>
        <LastStep />
      </View>
    );
  }

  const scren = Dimensions.get("screen").height - 10;
  return (
    <View
      className="w-11/12 rounded-md z-50 py-2 flex-1 justify-center"
      style={{
        minHeight: scren,
        maxHeight: scren,
      }}
    >
      <Text className="text-xl font-bold text-yellow-800 text-center mb-2">
        Crie sua conta Acessi
      </Text>

      <Text className="text-sm px-10 font-semibold text-yellow-800 text-center mb-6">
        Tenha acesso a recursos que facilitam o seu dia a dia
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
      <Text className="text-center text-sm text-[#85623a] py-4">
        Preencha os campos e verifique os termos para concluir a primeira etapa
        do cadastro.
      </Text>

      {children}
    </View>
  );
}
