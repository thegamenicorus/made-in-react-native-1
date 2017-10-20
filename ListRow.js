import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  AnimatedStyle,
  enter as AnimatedEnter,
  showDetail as AnimatedShowDetail,
  hideDetail as AnimatedHideDetail
} from "./animations";

import {
  AnimatedEnterStagger,
  AnimatedItemDetail
} from "./animations/controllers";

import AnimationType from "./animations/Types";
import { Metrics, Colors, Fonts } from "./themes";

const ANIMATION_DURATION = 500;

class ListRow extends PureComponent {
  constructor(props) {
    super(props);
    this.animatedEnterValue = new Animated.Value(0);
    this.animatedDetailValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.registerAnimation();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onPress = () => {
    const { index } = this.props;
    if (AnimatedItemDetail.getIndex() != index) {
      AnimatedItemDetail.run(
        index,
        this.animatedShowDetail,
        this.animatedHideDetail
      );
    }
  };

  registerAnimation = () => {
    //regis enter animation (slide from right)
    const animatedEnter = AnimatedEnter(
      this.animatedEnterValue,
      ANIMATION_DURATION
    );
    AnimatedEnterStagger.add(animatedEnter);

    //regis item detail animation (when press on this component)
    this.animatedShowDetail = AnimatedShowDetail(
      this.animatedDetailValue,
      ANIMATION_DURATION * 1.5
    );
    this.animatedHideDetail = AnimatedHideDetail(
      this.animatedDetailValue,
      ANIMATION_DURATION
    );

    //if this is last item of the list -> start stagger animation immediatly
    if (this.props.isLastItem) {
      AnimatedEnterStagger.run();
    }
  };

  getRandomStat() {
    return `${Math.floor(Math.random() * 100) + 1}k`;
  }

  getAnimatedStyle = () => {
    const animatedEnterStyle = AnimatedStyle(AnimationType.ENTER, {
      controlVar: this.animatedEnterValue,
      width: Metrics.screenWidth
    });

    const animatedDetailMainContainerStyle = AnimatedStyle(
      AnimationType.DETAIL_MAIN_CONTAINER,
      {
        controlVar: this.animatedDetailValue
      }
    );

    const animatedDetailContainerStyle = AnimatedStyle(
      AnimationType.DETAIL_CONTAINER,
      {
        controlVar: this.animatedDetailValue
      }
    );

    const animatedDetailMainElementStyle = AnimatedStyle(
      AnimationType.DETAIL_MAIN_ELEMENT,
      {
        controlVar: this.animatedDetailValue
      }
    );

    const animatedDetailSecondaryElementStyle = AnimatedStyle(
      AnimationType.DETAIL_SECONDARY_ELEMENT,
      {
        controlVar: this.animatedDetailValue
      }
    );

    const animatedDetailBottomMenuStyle = AnimatedStyle(
      AnimationType.DETAIL_BOTTOM_MENU,
      {
        controlVar: this.animatedDetailValue
      }
    );

    return {
      animatedEnterStyle,
      animatedDetailContainerStyle,
      animatedDetailMainContainerStyle,
      animatedDetailMainElementStyle,
      animatedDetailSecondaryElementStyle,
      animatedDetailBottomMenuStyle
    };
  };

  render() {
    const { name, picture, email, index } = this.props;
    const {
      animatedEnterStyle,
      animatedDetailContainerStyle,
      animatedDetailMainContainerStyle,
      animatedDetailMainElementStyle,
      animatedDetailSecondaryElementStyle,
      animatedDetailBottomMenuStyle
    } = this.getAnimatedStyle();

    //bg color
    const backgroundColor =
      Colors.listColorSet[this.props.index % Colors.listColorSet.length];
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <Animated.View
            style={[
              styles.container,
              animatedEnterStyle,
              animatedDetailMainContainerStyle,
              { backgroundColor }
            ]}
          >
            <Animated.View style={[styles.row, animatedDetailContainerStyle]}>
              <View>
                <Text style={styles.name}>
                  {`${this.capitalizeFirstLetter(
                    name.first
                  )} ${this.capitalizeFirstLetter(name.last)}`}
                </Text>
                <Text style={styles.email}>{email}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={[styles.image]}
                  source={{ uri: picture.medium }}
                />
              </View>
            </Animated.View>
          </Animated.View>

          <View style={[StyleSheet.absoluteFill, styles.detail]}>
            <View style={styles.detailRow}>
              <View style={styles.detailContainer}>
                <Animated.Text
                  style={[styles.nameLarge, animatedDetailMainElementStyle]}
                >
                  {`${this.capitalizeFirstLetter(
                    name.first
                  )} ${this.capitalizeFirstLetter(name.last)}`}
                </Animated.Text>

                <View style={styles.statContainer}>
                  <View style={[styles.statDetail]}>
                    <Animated.Text
                      style={[
                        styles.statNumber,
                        animatedDetailMainElementStyle
                      ]}
                    >
                      {this.getRandomStat()}
                    </Animated.Text>
                    <Animated.Text
                      style={[
                        styles.statType,
                        animatedDetailSecondaryElementStyle
                      ]}
                    >
                      POSTS
                    </Animated.Text>
                  </View>
                  <View style={[styles.separatorContainer]}>
                    <Animated.Text
                      style={[
                        styles.separator,
                        animatedDetailSecondaryElementStyle
                      ]}
                    >
                      |
                    </Animated.Text>
                  </View>
                  <View style={[styles.statDetail]}>
                    <Animated.Text
                      style={[
                        styles.statNumber,
                        animatedDetailMainElementStyle
                      ]}
                    >
                      {this.getRandomStat()}
                    </Animated.Text>
                    <Animated.Text
                      style={[
                        styles.statType,
                        animatedDetailSecondaryElementStyle
                      ]}
                    >
                      FOLLOWERS
                    </Animated.Text>
                  </View>
                  <View style={[styles.separatorContainer]}>
                    <Animated.Text
                      style={[
                        styles.separator,
                        animatedDetailSecondaryElementStyle
                      ]}
                    >
                      |
                    </Animated.Text>
                  </View>
                  <View style={[styles.statDetail]}>
                    <Animated.Text
                      style={[
                        styles.statNumber,
                        animatedDetailMainElementStyle
                      ]}
                    >
                      {this.getRandomStat()}
                    </Animated.Text>
                    <Animated.Text
                      style={[
                        styles.statType,
                        animatedDetailSecondaryElementStyle
                      ]}
                    >
                      FOLLOWING
                    </Animated.Text>
                  </View>
                </View>
              </View>
              <Animated.View
                style={[styles.imageContainer, animatedDetailMainElementStyle]}
              >
                <Image
                  style={[styles.imageDetail]}
                  source={{ uri: picture.medium }}
                />
                <View style={{ alignItems: "center" }}>
                  <Ionicons name="ios-more" size={40} color={Colors.snow} />
                </View>
              </Animated.View>
            </View>
            <Animated.View
              style={[styles.bottomMenu, animatedDetailBottomMenuStyle]}
            >
              <View style={styles.bottomMenuContainer}>
                <TouchableOpacity style={styles.button}>
                  <Ionicons
                    name="ios-contact-outline"
                    size={24}
                    color={Colors.listColorSet[2]}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Ionicons
                    name="ios-chatbubbles-outline"
                    size={22}
                    color={Colors.listColorSet[4]}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Ionicons
                    name="ios-cloud-download-outline"
                    size={22}
                    color={Colors.listColorSet[5]}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Ionicons
                    name="ios-trash-outline"
                    size={22}
                    color={Colors.error}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 3,
    zIndex: 0
  },
  detailContainer: {
    marginTop: 30
  },
  detail: {
    backgroundColor: "transparent",
    marginHorizontal: 35,
    marginTop: 10,
    zIndex: 2
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  statDetail: {
    minWidth: 40,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between"
  },
  separatorContainer: {
    justifyContent: "center"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageContainer: {
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      x: 0,
      y: 0
    },
    shadowRadius: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  imageDetail: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  name: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    color: Colors.snow
  },
  nameLarge: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.large,
    color: Colors.snow
  },
  email: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    marginTop: 5,
    color: Colors.snow
  },
  statNumber: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
    color: Colors.snow
  },
  statType: {
    marginTop: 3,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.tiny,
    color: Colors.snow
  },
  separator: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.snow
  },
  button: {
    marginTop: Platform.OS === "ios" ? 2 : 0
  },
  bottomMenu: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 7 : 14,
    paddingBottom: 5
  },
  bottomMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.snow,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 3,
    elevation: 3
  }
});

export default ListRow;
