import { Animated } from "react-native";

import Types from "./Types";
import SlideLeft from "./styles/SlideLeft";
import SlideRight from "./styles/SlideRight";
import {
  containerStyle as ItemDetailContainer,
  mainContainerStyle as ItemDetailMainContainer,
  mainElementStyle as ItemDetailMainElement,
  secondaryElementStyle as ItemDetailSecondaryElement,
  bottomMenuStyle as ItemDetailBottomMenu
} from "./styles/ItemDetail";
export const AnimatedStyle = (type, opts) => {
  switch (type) {
    case Types.DETAIL_CONTAINER:
      return ItemDetailContainer(opts);
    case Types.DETAIL_MAIN_CONTAINER:
      return ItemDetailMainContainer(opts);
    case Types.DETAIL_MAIN_ELEMENT:
      return ItemDetailMainElement(opts);
    case Types.DETAIL_SECONDARY_ELEMENT:
      return ItemDetailSecondaryElement(opts);
    case Types.DETAIL_BOTTOM_MENU:
      return ItemDetailBottomMenu(opts);
    case Types.ENTER:
      return SlideRight(opts);
  }
};

export const enter = (controlVar, duration) =>
  animatedTiming(controlVar, 1, duration);

export const showDetail = (controlVar, duration) =>
  animatedTiming(controlVar, 3, duration);

export const hideDetail = (controlVar, duration) =>
  animatedTiming(controlVar, 0, duration);

const animatedTiming = (controlVar, toValue, duration) =>
  Animated.timing(controlVar, { toValue, duration });
