import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function LastStep() {
  return (
    <View className="flex-1 justify-center items-center z-50">
      <LottieView
        source={require("../../../assets/json/success.json")}
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
      />
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text className="text-center text-base text-yellow-600 font-bold">
          Agora você já pode{" "}
          <Text className="text-center font-bold text-base text-yellow-800">
            fazer login
          </Text>
          .
        </Text>
      </TouchableOpacity>
    </View>
  );
}
