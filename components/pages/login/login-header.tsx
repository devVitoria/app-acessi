import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function LoginHeader() {
  return (
    <>
      <View
        className="flex flex-row items-center justify-between px-6 mt-12 "
        style={{
          backgroundColor: "#fff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#e5e7eb",

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 0,
          elevation: 1,
        }}
      >
        <StatusBar style="dark" backgroundColor="#fff" />
      </View>
    </>
  );
}
