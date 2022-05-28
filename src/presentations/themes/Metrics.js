import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export default {
  borderRadius: {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 24,
    huge: 32,
  },
  borderWidth: {
    tiny: 1,
    small: 2,
    medium: 4,
    large: 8,
    huge: 16,
  },
  margin: {
    tiny: 4,
    small: 8,
    medium: 12,
    regular: 16,
    large: 24,
    huge: 32,
  },
  icons: {
    tiny: 15,
    small: 20,
    medium: 36,
    large: 45,
    huge: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    huge: 80,
    cart: 100,
    logo: 200,
  },
  screen: {
    width: width,
    full: "100%",
    height: height,
  },
  font: {
    tiny: 4,
    small: 8,
    medium: 12,
    regular: 16,
    extraRegular: 20,
    large: 24,
    huge: 32,
  },
  fontWeights: {
    normal: "normal",
    bold: "bold"
  },
  flex: {
    flex1: 1
  },
  overflow: {
    hidden: "hidden"
  },
  flexDirection: {
    row: "row",
    column: "column"
  },
  alignSelf: {
    baseline: "baseline",
    flexEnd: "flex-end"
  },
  alignItems: {
    baseline: "baseline",
    flexEnd: "flex-end"
  }
}
