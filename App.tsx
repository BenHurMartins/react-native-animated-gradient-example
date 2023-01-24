import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const color1 = useSharedValue('#FF0000');
  const color2 = useSharedValue('#00FF00');
  const color3 = useSharedValue('#0000FF');
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const [animatedProps, setAnimatedProps] = useState({
    colors: [color1.value, color2.value, color3.value],
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setInterval(() => {
      const values = [color1.value, color2.value, color3.value];
      color1.value = withTiming(values[1], {duration: 2000});
      color2.value = withTiming(values[2], {duration: 2000});
      color3.value = withTiming(values[0], {duration: 2000});
      x.value = withTiming(Math.floor(Math.random() * 10) / 10, {
        duration: 2000,
      });
      y.value = withTiming(Math.floor(Math.random() * 10) / 10, {
        duration: 2000,
      });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDerivedValue(() => {
    const result = [color1.value, color2.value, color3.value];
    runOnJS(setAnimatedProps)({colors: result, x: x.value, y: y.value});
  }, [color1.value, color2.value, color3.value]);

  return (
    <Animated.View style={styles.container}>
      <LinearGradient
        colors={animatedProps.colors}
        style={styles.linearGradient}
        start={{x: animatedProps.x, y: animatedProps.y}}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
