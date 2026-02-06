import Header from "@/components/header";
import LoginHeader from "@/components/pages/login/login-header";
import useUserStore from "@/storage/user-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function RootLayoutNav() {
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    // TODO adicionar safe area insets
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NotifierWrapper containerStyle={{ position: "absolute", top: 34 }}>
          <Stack>
            <Stack.Screen name="home" options={{ header: () => <Header /> }} />
            <Stack.Screen
              name="register"
              options={{
                header: () => false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{ header: () => <LoginHeader /> }}
            />
            <Stack.Screen
              name="financial-chat"
              options={{ header: () => <LoginHeader /> }}
            />
          </Stack>
        </NotifierWrapper>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
