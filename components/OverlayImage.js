import { Image, StyleSheet } from "react-native";

const OverlayImage = () => {
  return (
    <Image source={require("../img/BG.jpg")} style={styles.overlayImage} />
  );
};

const styles = StyleSheet.create({
  overlayImage: {
    position: "relative",
    marginTop: 335,
    width: 390,
    height: 510,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: "contain",
  },
});

export default OverlayImage;
