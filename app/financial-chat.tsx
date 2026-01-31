import { cn } from "@/components/cn";
import { sendMessageChat, sentMessagesChat } from "@/services/financial";
import useUserStore from "@/storage/user-storage";
import { FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatBackground from "../assets/images/chatBackground.svg";
import LottieView from "lottie-react-native";

export default function FinancialChat() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const sendMessageM = useMutation({
    mutationFn: sendMessageChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finance-chat", user?.cpf],
      });
    },
  });

  const {
    data: sentMessages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["finance-chat", user?.cpf],
    queryFn: () => sentMessagesChat(user?.cpf ?? ""),
  });

  const handleSendMessage = () => {
    sendMessageM.mutate({
      cpf: user?.cpf ?? "",
      reason: message,
      value: 0,
      category: 0,
    });

    setMessage("");
  };

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center bg-[#ca8a0422] px-4">
      <View className="w-full h-[96%] justify-between items-center bg-white/40 border-[0.4px] border-[#854d0e77] rounded-lg">
        <ChatBackground
          color="#ca8a04"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
          }}
        />
        <View className="flex-1 w-full justify-between items-center rounded-lg px-2">
          <View className="flex  z-50 flex-row border-b-1 border-l-acessiPrimary h-16 w-full bg-[#854d0e77] justify-between items-center px-4 rounded-xl my-4">
            <View className="flex flex-row items-center gap-4">
              <Ionicons name="return-up-back-outline" size={24} color="white" />
              <Text className="text-white text-xl font-bold">
                Chat Financeiro de {user?.name.split(" ")[0]}
              </Text>
            </View>
            <SimpleLineIcons name="options-vertical" size={20} color="white" />
          </View>
          {isLoading ? (
            <View className="flex-1 justify-center items-center z-50">
              <LottieView
                source={require("../assets/json/loading.json")}
                autoPlay
                loop
                style={{ width: 400, height: 400 }}
              />
            </View>
          ) : (
            <FlatList
              className="flex-1 w-full z-50 "
              data={sentMessages}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => {
                const showDay =
                  item.index === 0 ||
                  sentMessages?.[item.index - 1]?.created_at.split(" ")[0] !==
                    item.item.created_at.split(" ")[0];

                const isCurrentDate =
                  item.item.created_at.split(" ")[0]?.replaceAll("/", "-") ===
                  dayjs().format("DD-MM-YYYY");
                return (
                  <View className="py-2 justify-end items-end">
                    {showDay && (
                      <View className="flex w-full items-center justify-center py-2 pb-8">
                        <View
                          className={cn(
                            `w-42 px-2 py-1 rounded-md bg-[#854d0e20]`,
                            { isCurrentDate: "w-24" },
                          )}
                        >
                          <Text className="text-center text-acessiPrimary font-bold">
                            {isCurrentDate
                              ? "Hoje"
                              : item.item.created_at.split(" ")[0]}
                          </Text>
                        </View>
                      </View>
                    )}

                    <View className="w-[80%] border-[#854d0e33] bg-[#854d0e20] border-[0.5px] py-2 rounded-md p-2">
                      <Text className="text-acessiPrimary">
                        {item.item.reason}
                      </Text>
                    </View>
                    <View className="w-14 h-5  bg-[#854d0e20] flex flex-row  mt-2 rounded-md items-center justify-around">
                      <FontAwesome5 name="clock" size={10} color="#854d0e" />
                      <Text className="text-xs text-acessiPrimary">
                        {item.item.created_at.split(" ")[1]}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
          <View className="flex flex-row h-16 w-full bg-[#854d0e77] justify-between items-center px-4 rounded-xl my-4 ">
            <TextInput
              value={message}
              onChangeText={setMessage}
              className="text-acessiPrimary text-lg w-[90%]"
              placeholderTextColor="#fff"
              placeholderClassName="font-bold"
              placeholder="Digite algo..."
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
