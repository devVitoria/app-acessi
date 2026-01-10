import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import CatFuse from "../../assets/images/catfuse.svg";
import { StepTwoProps } from "./interface";

export default function StepTwo({
  input,
  setEmailCode,
  timeSecond,
}: StepTwoProps) {
    // TODO vou habilitar posteriormente a verificacao de email, por enquanto o registro basta
  return input.email.length > 0  && false ? (
    <View className="justify-start items-center gap-6 pt-6">
      <Text className="text-center text-lg font-bold text-yellow-800">
        Validação de e-mail
      </Text>
      <Text className="text-center text-base text-yellow-800">
        Um código será enviado para o seu e-mail{" "}
        <Text className="text-center font-bold text-base text-yellow-800">
          {input.email}
        </Text>
        .
      </Text>

      <OtpInput
        numberOfDigits={4}
        focusColor="#854d0e"
        autoFocus={false}
        hideStick={true}
        placeholder="******"
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFilled={(text) => setEmailCode(text)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        textProps={{
          accessibilityRole: "text",
          accessibilityLabel: "OTP digit",
          allowFontScaling: false,
        }}
        theme={{
          containerStyle: styles.containerPin,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
        }}
      />

      <Text className="text-center font-bold text-xs text-yellow-800">
        {" "}
        A ação é necessária para concluir o cadastro.
      </Text>

      {timeSecond > 0 ? (
        <Text className="text-center text-base text-yellow-800">
          Solicitar um novo código em{" "}
          <Text className="font-bold">
            00:{timeSecond.toString().padStart(2, "0")}
          </Text>
        </Text>
      ) : (
        <TouchableOpacity onPress={() => console.log("Novo código")}>
          <Text className="text-center text-base text-yellow-700 font-bold underline">
            Solicitar novo código
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <>
      <Text className="text-center text-xs px-24 pb-2 font-bold text-yellow-950 mt-12">
        Insira um registro válido no campo indicado para realizar a validação de
        e-mail.
      </Text>

      <CatFuse width={124} height={124} color="#ca8a04" className="absolute" />
    </>
  );
}

const styles = StyleSheet.create({
  pinCodeContainer: {
    borderWidth: 1,
    borderColor: "#ca8a04",
    width: 48,
    height: 52,
  },
  pinCodeText: {
    fontSize: 24,
    color: "#854d0e",
    fontWeight: "bold",
  },
  containerPin: {
    justifyContent: "space-around",
    width: "90%",
  },
});
