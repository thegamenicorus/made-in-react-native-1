export default ({ controlVar, width }) => {
  const animationRight = width || 0;
  return {
    opacity: controlVar.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0.2, 1]
    }),
    transform: [
      {
        translateX: controlVar.interpolate({
          inputRange: [0, 1],
          outputRange: [animationRight, 0]
        })
      }
    ]
  };
};
