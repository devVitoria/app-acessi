import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AcessiLogo from "../assets/images/logo-acessi.svg";
import "../global.css";

type HeaderProps = {
  screen?: string;
};

const Header = ({ screen }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="dark" backgroundColor="#daa520" />

      <View
        className={`flex h-[76] w-full flex-row bg-white justify-center px-4 shadow-lg`}
        style={{
          marginTop: Math.trunc(insets.top),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          zIndex: 10,
        }}
      >
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center gap-4">
            <AcessiLogo width={36} height={36} color="#C99700" />
            <View className="flex flex-col">
              <Text className="text-yellow-600 font-bold text-lg">
                Bem vinda, Vitória!
              </Text>
              <Text className="text-yellow-600 font-light text-xs">Home</Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-4">
            <FontAwesome name="user-circle-o" size={30} color="#ca8a04" />
            <SimpleLineIcons name="settings" size={30} color="#ca8a04" />
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
