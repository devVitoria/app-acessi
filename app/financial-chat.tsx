import { cn } from "@/components/cn";
import useUserStore from "@/storage/user-storage";
import { FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
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
interface SentMessagesProps {
  message: string;
  hour: string;
  day?: string;
}
export default function FinancialChat() {
  const { user } = useUserStore();
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<SentMessagesProps[]>([
    {
      day: "24/01/2026",
      hour: "09:12",
      message: "Bom dia! Quero ver meus gastos de hoje",
    },
    {
      day: "24/01/2026",
      hour: "09:15",
      message: "Quanto eu gastei com alimentação?",
    },
    {
      day: "24/01/2026",
      hour: "18:42",
      message: "Adicionar gasto de R$ 45 no mercado",
    },

    {
      day: "25/01/2026",
      hour: "08:03",
      message: "Bom dia! Qual meu saldo atual?",
    },
    {
      day: "25/01/2026",
      hour: "12:27",
      message: "Adicionar gasto de R$ 120 em contas",
    },

    {
      day: "26/01/2026",
      hour: "07:58",
      message: "Hoje quero economizar",
    },
    {
      day: "26/01/2026",
      hour: "13:10",
      message: "Adicionar gasto de R$ 32 em almoço",
    },
    {
      day: "26/01/2026",
      hour: "21:45",
      message: "Resumo do dia, por favor",
    },

    {
      day: "27/01/2026",
      hour: "10:05",
      message: "Adicionar gasto de R$ 15 em café",
    },
  ]);
  // vou deixar mockado por enquanto

  const handleSendMessage = () => {
    const dateMessage = dayjs()
      .format("DD-MM-YYYY HH:MM")
      .replaceAll("-", "/")
      .split(" ");

    setSentMessages((prev) => [
      ...prev,
      {
        hour: dateMessage[1],
        message,
        day: dateMessage[0],
      },
    ]);

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

          <FlatList
            className="flex-1 w-full z-50 "
            data={sentMessages}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => {
              const showDay =
                item.index === 0 ||
                sentMessages[item.index - 1]?.day !== item.item.day;

              const isCurrentDate =
                item.item.day?.replaceAll("/", "-") ===
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
                          {isCurrentDate ? "Hoje" : item.item.day}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View className="w-[80%] border-[#854d0e33] bg-[#854d0e20] border-[0.5px] py-2 rounded-md p-2">
                    <Text className="text-acessiPrimary">
                      {item.item.message}
                    </Text>
                  </View>
                  <View className="w-14 h-5  bg-[#854d0e20] flex flex-row  mt-2 rounded-md items-center justify-around">
                    <FontAwesome5 name="clock" size={10} color="#854d0e" />
                    <Text className="text-xs text-acessiPrimary">
                      {item.item.hour}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
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
