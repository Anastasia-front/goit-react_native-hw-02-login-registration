import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./Screens/LoginScreen";
// import Registration from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      {/* <Registration /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
