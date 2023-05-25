import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "./Input";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState("#F6F6F6");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //   F6F6F6
  //   1b4371
  const handleFocus = () => {
    setHidden("#1b4371");
  };

  useEffect(() => {
    if (password !== "") {
      handleFocus();
    }
  }, [password]);

  return (
    <View style={{ marginBottom: 50 }}>
      <Input
        placeholder="Пароль"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={togglePasswordVisibility}
      >
        <Text style={{ color: hidden }}>
          {showPassword ? "Сховати" : "Показати"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  showPasswordButton: {
    paddingHorizontal: 10,
    marginTop: -49,
    paddingLeft: 270,
  },
});

export default PasswordInput;
