const Palette = {
  lightPrimary: "#4EC7AE",
	darkPrimary: "#17816B",
  white: "#FFFFFF",
  red: "#FB3640",
  black: "#000000",
  disabledGrey: "#D9D9D9",
  grey: "#5E6765"
}

export default {
  textButton: {
    focused: Palette.darkPrimary,
    default: Palette.lightPrimary,
    disabled: Palette.disabledGrey,
    text: Palette.white
  },
  errorText: {
    text: Palette.red
  },
  settingsButton: {
    background: Palette.white
  },
  cartList: {
    background: Palette.white,
    title: Palette.black,
    subtitle: Palette.grey,
    description: Palette.black,
    total: Palette.black,
    trash: Palette.red
  },
  orderList: {
    background: Palette.white,
    title: Palette.black,
    description: Palette.black,
  },
  indicator: {
    loading: Palette.lightPrimary
  },
  productList: {
    background: Palette.white,
    title: Palette.black
  },
  bottomBar: {
    background: Palette.white
  }
}