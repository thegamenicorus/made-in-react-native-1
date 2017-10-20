import { Animated } from "react-native";

let instance = null;
const STAGGER_DELAY = 50;

class EnterStagger {
  static getInstance() {
    if (instance === null) {
      instance = new EnterStagger();
    }
    return instance;
  }

  constructor() {
    this.animatedList = [];
  }

  add(animated) {
    this.animatedList.push(animated);
  }

  clear() {
    this.animatedList = [];
  }

  run() {
    Animated.stagger(STAGGER_DELAY, this.animatedList).start(({ finished }) => {
      if (finished) {
        this.clear();
      }
    });
  }
}

export default EnterStagger.getInstance();
