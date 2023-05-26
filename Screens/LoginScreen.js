import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import OverlayImage from "../components/OverlayImage";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import CustomLink from "../components/Link";
import Title from "../components/Title";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";

export default function Login() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Invalid email");
      alert("Invalid email: it must contain @ and domain part, invalid space");
    } else {
      setValidationError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setValidationError("Password should be at least 6 characters");
      alert("Password should be at least 6 characters");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();

    if (!validationError) {
      console.log("Form submitted successfully");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - 150);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../img/Photo-BG.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[styles.overlayContainer, { paddingBottom: keyboardHeight }]}
          >
            <OverlayImage />
            <View style={styles.formContainer}>
              <Title title={"Увійти"} top={200} />
              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                  />
                  <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                  />
                </KeyboardAvoidingView>
              </View>

              <CustomButton width={343} text="Увійти" onPress={handleSubmit} />
              <View style={styles.text}>
                <Text style={styles.textColor}>Немає акаунту?</Text>
                <CustomLink
                  color="#1B4371"
                  top={0}
                  left={10}
                  text="Зареєструватися"
                  onPress={() => console.log("link")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  imageBackground: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: "#1B4371",
  },
});
