import { Platform } from "react-native";

const type = {
  base: Platform.OS === "ios" ? "Avenir-Book" : "Roboto"
};

const size = {
  large: 22,
  regular: 18,
  medium: 14,
  small: 12,
  tiny: 8
};

const style = {
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
