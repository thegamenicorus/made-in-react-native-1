import { Metrics } from "../../themes";

export const mainContainerStyle = ({ controlVar }) => {
  return {
    marginVertical: controlVar.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 30],
      extrapolate: "clamp"
    })
  };
};

export const containerStyle = ({ controlVar }) => {
  return {
    height: controlVar.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.itemHeight, Metrics.itemDetailHeight],
      extrapolate: "clamp"
    }),
    opacity: controlVar.interpolate({
      inputRange: [0, 0.1],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })
  };
};

export const mainElementStyle = ({ controlVar }) => {
  return {
    opacity: controlVar.interpolate({
      inputRange: [1, 2],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })
  };
};

export const secondaryElementStyle = ({ controlVar }) => {
  return {
    opacity: controlVar.interpolate({
      inputRange: [1.5, 3],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })
  };
};

export const bottomMenuStyle = ({ controlVar }) => {
  return {
    opacity: controlVar.interpolate({
      inputRange: [1.5, 3],
      outputRange: [0, 1],
      extrapolate: "clamp"
    }),
    transform: [
      {
        scale: controlVar.interpolate({
          inputRange: [1.5, 3],
          outputRange: [0, 1],
          extrapolate: "clamp"
        })
      }
    ]
  };
};
