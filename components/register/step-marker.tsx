import { TouchableOpacity, View } from "react-native";
import { StepMarkerProps } from "./utils/interface";

export default function StepMarker({
  nroSteps,
  onClick,
  currentStep,
}: StepMarkerProps) {
  return (
    <View className="h-4 bg-white flex-row items-center justify-center gap-4">
      {Array.from({ length: nroSteps }).map((_, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onClick(idx)}
          className={`${
            currentStep || idx === 0
              ? "bg-yellow-800"
              : "border-yellow-800 border"
          } w-10 h-4 rounded-lg`}
        />
      ))}
    </View>
  );
}
