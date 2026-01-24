import useUserStore from "@/storage/user-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AcessiLogo from "../../assets/images/logo-acessi.svg";
const Header = () => {
  const userStore = useUserStore();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" backgroundColor="#fff" />
      <View className="bg-[#ca8a0455]">
        <View
          className={`flex h-[78] w-full flex-row bg-white justify-center px-4 shadow-lg rounded-b-3xl`}
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
                <Text className="text-yellow-700 font-bold text-lg">
                  Bem vinda, {userStore.user?.name.split(" ")[0] || "usuário"}!
                </Text>
                <Text className="text-yellow-700 font-light text-xs">Home</Text>
              </View>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center gap-4"
              onPress={() => router.push("/login")}
            >
              <MaterialCommunityIcons
                name="account-arrow-left-outline"
                size={40}
                color="#a16207"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
