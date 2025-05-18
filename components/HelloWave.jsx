import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "./ThemedText";

export function HelloWave() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    const wave = withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 }),
      withDelay(1700, withTiming(0, { duration: 0 }))
    );

    rotation.value = withRepeat(wave, -1);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
