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
              ? "bg-[#ca8a0455] border border-[#CA8A0444]"
              : "border-[#CA8A0455] border bg-[#CA8A0410]"
          } w-5 h-4 rounded-lg`}
        />
      ))}
    </View>
  );
}
