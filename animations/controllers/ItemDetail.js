import { Animated } from "react-native";

let instance = null;
const STAGGER_DELAY = 50;

class ItemDetail {
  static getInstance() {
    if (instance === null) {
      instance = new ItemDetail();
    }
    return instance;
  }

  constructor() {
    this.animatedHide = null;
    this.currentIndex = -1;
    this.animating = false;
  }

  getIndex() {
    return this.currentIndex;
  }

  run(index, animatedShow, animatedHide) {
    if (!this.animating) {
      this.animating = true;
      this.currentIndex = index;
      let animatedList = [animatedShow];
      if (this.animatedHide) {
        animatedList.push(this.animatedHide);
      }
      Animated.parallel(animatedList).start(({ finished }) => {
        if (finished) {
          //keep animatedHide
          this.animatedHide = animatedHide;
          this.animating = false;
        }
      });
    }
  }
}

export default ItemDetail.getInstance();
