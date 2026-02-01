import { Modal, Text, View } from "react-native";
import { ModalInfoProps } from "./utils/interface";

export default function Modalinfo({ open, setOpen }: ModalInfoProps) {
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
          className="w-full p-5 justify-center items-center bg-[#854d0e33]"
          onStartShouldSetResponder={() => {
            return true;
          }}
        >
          <Text className="text-yellow-800 font-bold mb-4 text-lg">
            Como usar meu Chat Financeiro?
          </Text>
          <Text className="text-center ">
            Envie uma mensagem para registrar um gasto!
          </Text>

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
          </Text>
        </View>
      </View>
    </Modal>
  );
}
