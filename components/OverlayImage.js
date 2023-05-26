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
    borderRadius: "25px 25px 0px 0px",
    resizeMode: "contain",
  },
});

export default OverlayImage;
