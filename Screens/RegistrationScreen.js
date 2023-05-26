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
import OverlayImage from "../components/OverlayImage";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import CustomLink from "../components/Link";
import Title from "../components/Title";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";

export default function Registration() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [avatar, setAvatar] = useState("../img/Rectangle-empty.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      setValidationError("Invalid name");
      alert(
        "Invalid name: login cannot contain numbers, hyphens, spaces, special characters"
      );
    } else {
      setValidationError("");
    }
  };

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
    validateName();
    validateEmail();
    validatePassword();

    if (!validationError) {
      console.log(
        `Form submitted successfully! Name: ${name}, email: ${email}, password: ${password}`
      );
    }
  };

  const handlePhotoAdd = (path) => {
    setAvatar(`${path}`);
  };

  const handlePhotoDelete = () => {
    setAvatar("../img/Rectangle-empty.jpg");
  };

  const renderImage = () => {
    if (avatar === "../img/Rectangle-empty.jpg") {
      //   handlePhotoAdd();
      return (
        <Image
          style={styles.photoImage}
          source={require("../img/Rectangle-empty.jpg")}
        />
      );
    } else {
      //   handlePhotoDelete();
      return (
        <Image style={styles.photoImage} source={require("../img/Photo.jpg")} />
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - 30);
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const photoImageTop = keyboardOpen ? keyboardHeight - 190 : 270;
  const psevdoTop = keyboardOpen ? keyboardHeight - 110 : 350;

  const styles = {
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
    photoImage: {
      width: 120,
      height: 120,
      position: "absolute",
      top: photoImageTop,
      left: 130,
      borderRadius: 16,
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
    psevdo: {
      position: "absolute",
      top: psevdoTop,
      left: 263,
    },
    afterElement: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 25,
      height: 25,
    },
    afterElementCircle: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
      backgroundColor: "#fff",
      borderColor: "#FF6C00",
      borderWidth: 1,
      borderRadius: "50%",
    },
    afterElementCircleGray: {
      borderColor: "#E8E8E8",
    },
    afterElementUnion: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
    },
    afterElementVertical: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
    },
    afterElementVerticalGray: {
      backgroundColor: "#E8E8E8",
      transform: "rotate(45deg)",
    },
    afterElementHorizontal: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
      transform: "rotate(-90deg)",
    },
    afterElementHorizontalGray: {
      backgroundColor: "#E8E8E8",
      transform: "rotate(-45deg)",
    },
  };

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
            {renderImage()}
            <View style={styles.psevdo}>
              <View style={styles.afterElement}>
                <View
                  style={[
                    styles.afterElementCircle,
                    avatar !== "../img/Rectangle-empty.jpg" &&
                      styles.afterElementCircleGray,
                  ]}
                >
                  <View style={styles.afterElementUnion}>
                    <View
                      style={[
                        styles.afterElementVertical,
                        avatar !== "../img/Rectangle-empty.jpg" &&
                          styles.afterElementVerticalGray,
                      ]}
                    />
                    <View
                      style={[
                        styles.afterElementHorizontal,
                        avatar !== "../img/Rectangle-empty.jpg" &&
                          styles.afterElementHorizontalGray,
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.formContainer}>
              <Title title={"Реєстрація"} top={300} />
              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input
                    placeholder="Логін"
                    value={name}
                    onChangeText={setName}
                    onBlur={validateName}
                  />
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

              <CustomButton
                width={343}
                text="Зареєструватися"
                onPress={handleSubmit}
              />
              <View style={styles.text}>
                <Text style={styles.textColor}>Вже є акаунт?</Text>
                <CustomLink
                  color="#1B4371"
                  top={0}
                  left={10}
                  text="Увійти"
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
