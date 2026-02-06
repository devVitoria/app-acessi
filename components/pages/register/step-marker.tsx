import { TouchableOpacity, View } from "react-native";
import { StepMarkerProps } from "./utils/interface";

export default function StepMarker({
  nroSteps,
  onClick,
  currentStep,
}: StepMarkerProps) {
  return (
    <View className="h-3 bg-white flex-row items-center justify-center gap-4">
      {Array.from({ length: nroSteps }).map((_, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onClick(idx)}
          className={`${
            currentStep || idx === 0
              ? "bg-acessiPrimary border border-[#CA8A0444]"
              : "border-acessiPrimary border bg-[#CA8A0410]"
          } w-4 h-4 rounded-lg`}
        />
      ))}
    </View>
  );
}
