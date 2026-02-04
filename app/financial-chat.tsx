import { cn } from "@/components/cn";
import Modalinfo from "@/components/pages/chat/modal";
import { sendMessageChat, sentMessagesChat } from "@/services/financial";
import useUserStore from "@/storage/user-storage";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatBackground from "../assets/images/chatBackground.svg";

export default function FinancialChat() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const [hiddenSubtitle, setHiddenSubtitle] = useState(false);
  const [messageSelected, setMessageSelected] = useState<{
    id: number;
  } | null>(null);

  // utilizar qundo for criar tb
  const [categories, setCategories] = useState<
    | {
        id: number;
        name: string;
        icon: React.ReactNode;
      }[]
    | null
  >([
    {
      id: 1,
      name: "Comida",
      icon: <Ionicons name="fast-food" size={16} color="#854d0e" />,
    },
    {
      id: 2,
      name: "Mercado",
      icon: <Entypo name="shopping-cart" size={16} color="#854d0e" />,
    },

    {
      id: 3,
      name: "Uber",
      icon: <AntDesign name="car" size={16} color="#854d0e" />,
    },

    {
      id: 4,
      name: "Compras",
      icon: <Feather name="shopping-bag" size={16} color="#854d0e" />,
    },
    {
      id: 5,
      name: "Roupas",
      icon: <Ionicons name="shirt" size={16} color="#854d0e" />,
    },
    {
      id: 6,
      name: "Remédio",
      icon: <Fontisto name="pills" size={16} color="#854d0e" />,
    },
    {
      id: 7,
      name: "Adicionar",
      icon: <Feather name="plus" size={16} color="#854d0e" />,
    },
  ]);

  const [actions, setActions] = useState<
    | {
        id: number;
        name: string;
        icon: React.ReactNode;
      }[]
    | null
  >([
    {
      id: 1,
      name: "Editar",
      icon: <MaterialIcons name="edit" size={16} color="#854d0e" />,
    },
    {
      id: 1,
      name: "Deletar",
      icon: <MaterialIcons name="delete" size={16} color="#854d0e" />,
    },
  ]);
  // vou deixar mockadas as defaults por enquanto antes de colocar em tabela

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View
        className="flex-1 justify-center items-center w-full bg-[#ca8a0422] px-2"
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
          setMessageSelected(null);
          return true;
        }}
      >
        <View className="w-full flex-1 justify-between items-center bg-white/40 border-[0.4px] border-[#854d0e77] rounded-lg">
          <ChatBackground
            color="#ca8a04"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
            }}
          />
          <View className="flex-1 w-full ">
            <View className="flex flex-row items-center gap-4 my-2 w-full px-2 ">
              <TouchableOpacity
                onPress={() => {
                  router.push("/home");
                }}
              >
                <Ionicons name="arrow-back-outline" size={24} color="#854d0e" />
              </TouchableOpacity>

              <View className="flex-1 flex-col justify-center items-center w-full px-2">
                <View className="flex flex-row w-full justify-between items-center ">
                  <Text className="text-yellow-800 font-bold">
                    Seu Chat Financeiro
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setHiddenSubtitle(!hiddenSubtitle);
                    }}
                  >
                    <MaterialIcons
                      name={
                        hiddenSubtitle
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={24}
                      color="#854d0e"
                    />
                  </TouchableOpacity>
                </View>
                {!hiddenSubtitle && (
                  <View className="flex flex-row justify-between items-center w-full ">
                    <Text className="text-yellow-800 text-xs max-w-[80%]">
                      Agora você pode registrar seus gastos em formato de
                      conversa!
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setHiddenInfo(!hiddenInfo);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="comment-question"
                        size={24}
                        color="#854d0e"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View className="flex z-50 flex-row border-b-1 border-l-acessiPrimary w-full bg-[#854d0e77] justify-between items-center px-4 rounded-b-xl mb-4">
              <View className="flex flex-row items-center gap-4 py-2">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/home");
                  }}
                  className="h-12 w-12 bg-white/40 rounded-full justify-center items-center"
                >
                  <FontAwesome5 name="user-alt" size={24} color="#854d0e77" />
                </TouchableOpacity>
                <View className="flex flex-col justify-start items-start">
                  <Text className="text-white/80 font-bold text-lg">
                    {user?.name.split(" ")[0]}
                  </Text>
                  <Text className="text-white/80 text-xs">No chat</Text>
                </View>
              </View>
              <SimpleLineIcons
                name="options-vertical"
                size={20}
                color="white"
                className="opacity-80"
              />
            </View>
            {isLoading ? (
              <View className="flex-1 justify-center items-center z-50">
                <LottieView
                  source={require("../assets/json/loading.json")}
                  autoPlay
                  loop
                  style={{ width: 300, height: 300 }}
                />

                <Text className="text-sm text-yellow-800">
                  Carregando seu chat...
                </Text>
              </View>
            ) : sentMessages.length > 0 ? (
              <View className="flex-1 w-full  z-50">
                <FlatList
                  className="flex-1 w-full z-50 "
                  data={sentMessages}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => {
                    const showDay =
                      item.index === 0 ||
                      sentMessages?.[item.index - 1]?.created_at.split(
                        " ",
                      )[0] !== item.item.created_at.split(" ")[0];

                    const isCurrentDate =
                      item.item.created_at
                        .split(" ")[0]
                        ?.replaceAll("/", "-") === dayjs().format("DD-MM-YYYY");
                    return (
                      <View className=" py-2 justify-end items-end">
                        {showDay && (
                          <View className=" flex w-full items-center justify-center py-2 pb-8">
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
                        <Pressable
                          className={cn(
                            `w-full justify-end items-end rounded-md py-1`,
                            {
                              "bg-yellow-800/5 relative":
                                messageSelected?.id === item.item.id,
                            },
                          )}
                          onLongPress={() => {
                            setMessageSelected({
                              id: item.item.id,
                            });
                          }}
                        >
                          {messageSelected?.id === item.item.id && (
                            <View className="flex flex-row gap-3 py-1 rounded-lg absolute mb-10 px-6 ">
                              {categories?.map((c) => (
                                <View className="flex flex-col gap-1 justify-center items-center bg-[#854d0e30] border border-yellow-900 w-8 h-8 rounded-full">
                                  {c.icon}
                                </View>
                              ))}
                            </View>
                          )}

                          <View
                            className={`w-[80%] border-[#854d0e33] bg-[#854d0e20] border-[0.5px] py-2 rounded-md p-2`}
                          >
                            <Text className="text-acessiPrimary">
                              {item.item.reason}
                            </Text>
                          </View>
                        </Pressable>

                        {messageSelected?.id === item.item.id && (
                          <View className="flex flex-row gap-3 py-1 rounded-lg absolute mr-12 mt-6 px-6 ">
                            {actions?.map((c) => (
                              <View className="flex flex-col gap-1 justify-center items-center bg-[#854d0e30] border border-yellow-900 w-8 h-8 rounded-full">
                                {c.icon}
                              </View>
                            ))}
                          </View>
                        )}
                        <View className="w-14 h-5  bg-[#854d0e20] flex flex-row  mt-2 rounded-md items-center justify-around">
                          <FontAwesome5
                            name="clock"
                            size={10}
                            color="#854d0e"
                          />
                          <Text className="text-xs text-acessiPrimary">
                            {item.item.created_at.split(" ")[1]}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            ) : (
              <View className="flex-1 justify-start items-center z-50">
                <LottieView
                  source={require("../assets/json/sent.json")}
                  autoPlay
                  loop
                  style={{ width: 300, height: 300, opacity: 0.8 }}
                />

                <Text className="text-center text-sm text-yellow-800">
                  Nada aqui... Envie uma mensagem para começar!
                </Text>
              </View>
            )}
            <View className="w-full p-4">
              <View className="flex flex-row h-16  bg-[#854d0e77] justify-between items-center px-4 rounded-xl my-4 ">
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  className="text-white text-lg w-[90%]"
                  placeholderTextColor="#fff"
                  placeholderClassName="font-bold"
                  placeholder="Digite algo..."
                />
                <TouchableOpacity onPress={handleSendMessage}>
                  <Ionicons name="send-sharp" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {hiddenInfo && (
              <Modalinfo open={hiddenInfo} setOpen={setHiddenInfo} />
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
