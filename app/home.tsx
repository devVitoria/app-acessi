import FinancialChatBtnCall from "@/components/pages/home/financial-chat-btn-call";
import { verifyToken } from "@/services/auth";
import useUserStore from "@/storage/user-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Notifier, NotifierComponents } from "react-native-notifier";

export default function Home() {
  const token = useUserStore();
  const handleSendToLogin = () => {
    Notifier.showNotification({
      title: "Acesso expirado",
      description: "Redirecionado para a tela de Login.",
      Component: NotifierComponents.Notification,
    });
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  const verifyTokenMutation = useMutation({
    mutationFn: verifyToken,
    onSuccess: (v) => {
      if (v.status === "unauthorized") {
        handleSendToLogin();
      }
    },
  });
  useEffect(() => {
    if ((token.user?.token ?? "").length === 0) {
      handleSendToLogin();
    }

    verifyTokenMutation.mutate(token.user?.token ?? "");
  }, []);
  return (
    <View className="flex-1 bg-acessiSecondary items-center justify-center px-2 ">
      <View className="absolute top-8 gap-1">
        <Text className="text-3xl font-bold text-acessiPrimary text-center ">
          Acessi
        </Text>
        <Text className="text-sm font-bold text-acessiPrimary">
          Seu APP facilitador!
        </Text>
      </View>

      <View className="flex flex-1 mt-32 bg-white border border-acessiSecondary75 w-full rounded-t-3xl  drop-shadow-lg p-10">
        <FinancialChatBtnCall />
      </View>
    </View>
  );
}
