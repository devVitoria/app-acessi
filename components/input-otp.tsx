import { StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { InputOtpProps } from "./interface";

export default function InputOtp({
  setEmailCode,
  numberOfDigits = 4,
  screen,
}: InputOtpProps) {
  return (
    <OtpInput
      numberOfDigits={numberOfDigits}
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
