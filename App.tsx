/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
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
  const [colors, setColors] = useState([color1.value, color2.value]);

  useEffect(() => {
    setInterval(() => {
      const values = [color1.value, color2.value, color3.value];
      color1.value = withTiming(values[1], {duration: 4900});
      color2.value = withTiming(values[2], {duration: 4900});
      color3.value = withTiming(values[0], {duration: 4900});
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDerivedValue(() => {
    const result = [color1.value, color2.value, color3.value];
    runOnJS(setColors)(result);
  }, [color1.value, color2.value]);

  return (
    <Animated.View style={styles.container}>
      <LinearGradient
        colors={colors}
        style={styles.linearGradient}
        start={{x: 0.7, y: 0}}>
        <Text>Diagonal Gradient</Text>
      </LinearGradient>
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
