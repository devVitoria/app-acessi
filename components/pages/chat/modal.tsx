import { useVideoPlayer, VideoView } from "expo-video";
import { Modal, StyleSheet, Text, View } from "react-native";
import { ModalInfoProps } from "./utils/interface";

export default function Modalinfo({ open, setOpen }: ModalInfoProps) {
  const player = useVideoPlayer(
    require("../../../assets/videos/send-message.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );
  return (
    <Modal transparent statusBarTranslucent visible animationType="slide">
      <View
        className="flex-1 bg-white/80 justify-center items-center px-10"
        onStartShouldSetResponder={() => {
          setOpen(false);
          return true;
        }}
      >
        <View
          className="w-full p-5 justify-center items-center bg-[#854d0e33] rounded-lg"
          style={styles.contentContainer}
          onStartShouldSetResponder={() => {
            return true;
          }}
        >
          <Text className="text-yellow-800 font-bold ">
            Como usar meu Chat Financeiro?
          </Text>
          <Text className="text-center text-sm py-4 max-w-[60%]">
            Envie uma mensagem para registrar um gasto!
          </Text>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            pointerEvents="none"
            nativeControls={false}
          />

          {/* TODO: adicionar paginação com uma instrução e um video pra cada */}
          {/*

          <Text className="text-center">
            Você pode adicionar uma categoria ao gasto apenas definindo uma
            reação correspondente ao selcionar a mensagem
          </Text>

          <Text className="text-center">
            As categorias podem ser definidas por você clicando nos três pontos
            localizados no lado superior da tela ou, caso prefira, pode
            selecionar as categorias padrões.
          </Text>

          <Text className="text-center">
            Você pode editar suas mensagens sselcioanando elas
          </Text>

          <Text className="text-center">
            Essas inforamções serão utilizadas em relatórios personalizados
            sobre os seus gastos
          </Text> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 400,
    height: 275,
  },
});
