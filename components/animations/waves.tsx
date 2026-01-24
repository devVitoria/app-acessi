import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";
import Group from "../../assets/images/background.svg";
import Group2 from "../../assets/images/colorbackground.svg";

const float: CSSAnimationKeyframes = {
  from: {
    transform: [{ translateY: 0 }],
  },
  to: {
    transform: [{ translateY: -40 }],
  },
};

export default function Animation() {
  return (
    <View style={styles.container}>
      <View className="flex flex-col gap-4">
        <Animated.View
          style={[
            {
              animationName: float,
              zIndex: 10,
              top: 200,
              animationDuration: "2s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDirection: "alternate",
            },
          ]}
        >
          <Group2 width={600} height={400} color="#ca8a04" />
        </Animated.View>

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              top: 30,
              zIndex: 5,
              animationName: float,
              animationDuration: "3s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDirection: "alternate",
            },
          ]}
        >
          <Group width={600} height={400} color="#e8c376" />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    height: 80,
    borderRadius: 100,
    width: Dimensions.get("window").width,
    backgroundColor: "#ca8a04",
    margin: 64,
  },
  box2: {
    height: 80,
    borderRadius: 100,
    width: Dimensions.get("window").width,
    backgroundColor: "#e8c376",
    margin: 64,
  },
});
