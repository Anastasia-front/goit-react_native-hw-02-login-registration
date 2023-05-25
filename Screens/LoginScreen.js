import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import CustomLink from "../components/Link";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";

export default function Login() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
          {/* <View style={{ paddingBottom: keyboardHeight }}> */}
          <View
            style={[styles.overlayContainer, { paddingBottom: keyboardHeight }]}
          >
            <Image
              source={require("../img/BG.jpg")}
              style={styles.overlayImage}
            />
            <View style={styles.formContainer}>
              <Text style={styles.title}>Увійти</Text>

              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input placeholder="Адреса електронної пошти"></Input>
                  <PasswordInput />
                </KeyboardAvoidingView>
              </View>

              <CustomButton
                width={343}
                text="Увійти"
                onPress={() => console.log("log in")}
              />
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
          {/* </View> */}
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
  overlayImage: {
    marginTop: 335,
    width: 390,
    height: 510,
    borderRadius: "25px 25px 0px 0px",
    resizeMode: "contain",
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
  title: {
    marginTop: 200,
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: 0.01,
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
