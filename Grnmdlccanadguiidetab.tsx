import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Grnmdlccanadguiideexplr from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiideexplr';
import Grnmdlccanadguiidesavd from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiidesavd';
import Grnmdlccanadguiidemap from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiidemap';
import Grnmdlccanadguiidefacts from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiidefacts';
import Grnmdlccanadguiidequz from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiidequz';
import Grnmdlccanadguiidecollc from './Grnmdlccanadguiide/Grnmdlccanadguiidescrn/Grnmdlccanadguiidecollc';

const Tab = createBottomTabNavigator();

const GrnmdlccanadguiidAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const grnmdlccanadguiidScale = useRef(new Animated.Value(1)).current;

  const grnmdlccanadguiidHandlePressIn = () => {
    Animated.spring(grnmdlccanadguiidScale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const grnmdlccanadguiidHandlePressOut = () => {
    Animated.spring(grnmdlccanadguiidScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={grnmdlccanadguiidHandlePressIn}
      onPressOut={grnmdlccanadguiidHandlePressOut}
      style={[style as ViewStyle, styles.grnmdlccanadguiidButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.grnmdlccanadguiidButtonInner,
          {transform: [{scale: grnmdlccanadguiidScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const GrnmdlccanadguiidIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.grnmdlccanadguiidIconWrap}>
      <View style={styles.grnmdlccanadguiidIconImageWrap}>
        {focused ? (
          <Image
            source={require('./assets/i/grnmdlccanadguifocs.png')}
            style={{position: 'absolute', top: -20, right: 2}}
          />
        ) : null}

        <Image
          source={source}
          tintColor={focused ? undefined : '#FFFFFF59'}
          style={{width: 22, height: 22}}
        />
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        numberOfLines={1}
        style={[
          styles.grnmdlccanadguiidLabel,
          focused
            ? styles.grnmdlccanadguiidLabelFocused
            : styles.grnmdlccanadguiidLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const grnmdlccanadguiidBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#0A1810F5', '#0A1810F5']}
    style={StyleSheet.absoluteFill}
  />
);

const grnmdlccanadguiidIconPlaces = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Explore"
    source={require('./assets/i/grnmdlccanadguiidtab1.png')}
  />
);

const grnmdlccanadguiidIconSaved = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Saved"
    source={require('./assets/i/grnmdlccanadguiidtab2.png')}
  />
);

const grnmdlccanadguiidIconMap = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Map"
    source={require('./assets/i/grnmdlccanadguiidtab3.png')}
  />
);

const grnmdlccanadguiidIconBlog = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Facts"
    source={require('./assets/i/grnmdlccanadguiidtab4.png')}
  />
);

const grnmdlccanadguiidIconQuiz = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Quiz"
    source={require('./assets/i/grnmdlccanadguiidtab5.png')}
  />
);

const grnmdlccanadguiidIconGallery = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Gallery"
    source={require('./assets/i/grnmdlccanadguiidtab6.png')}
  />
);

const grnmdlccanadguiidButton = (props: Record<string, unknown>) => (
  <GrnmdlccanadguiidAnimatedButton {...props} />
);

const Grnmdlccanadguiidetab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.grnmdlccanadguiidBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: grnmdlccanadguiidButton,
        tabBarBackground: grnmdlccanadguiidBarBackground,
      }}>
      <Tab.Screen
        name="Grnmdlccanadguiideexplr"
        component={Grnmdlccanadguiideexplr}
        options={{
          tabBarIcon: grnmdlccanadguiidIconPlaces,
        }}
      />
      <Tab.Screen
        name="Grnmdlccanadguiidesavd"
        component={Grnmdlccanadguiidesavd}
        options={{
          tabBarIcon: grnmdlccanadguiidIconSaved,
        }}
      />
      <Tab.Screen
        name="Grnmdlccanadguiidemap"
        component={Grnmdlccanadguiidemap}
        options={{
          tabBarIcon: grnmdlccanadguiidIconMap,
        }}
      />
      <Tab.Screen
        name="Grnmdlccanadguiidefacts"
        component={Grnmdlccanadguiidefacts}
        options={{
          tabBarIcon: grnmdlccanadguiidIconBlog,
        }}
      />
      <Tab.Screen
        name="Grnmdlccanadguiidequz"
        component={Grnmdlccanadguiidequz}
        options={{
          tabBarIcon: grnmdlccanadguiidIconQuiz,
        }}
      />
      <Tab.Screen
        name="Grnmdlccanadguiidecollc"
        component={Grnmdlccanadguiidecollc}
        options={{
          tabBarIcon: grnmdlccanadguiidIconGallery,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  grnmdlccanadguiidLabelFocused: {
    color: '#CCB500',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  grnmdlccanadguiidBar: {
    elevation: 0,
    paddingTop: 10,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    borderColor: '#FFFFFF14',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF14',
    backgroundColor: 'transparent',
    height: 90,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  grnmdlccanadguiidButton: {
    flex: 1,
  },
  grnmdlccanadguiidButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grnmdlccanadguiidIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidIconSel: {
    position: 'absolute',
    top: -6,
  },
  grnmdlccanadguiidIconSelFocused: {
    zIndex: -1,
  },

  grnmdlccanadguiidIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidIconCircleFocused: {
    borderWidth: 1,
    borderColor: '#805CB4',
  },
  grnmdlccanadguiidLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  grnmdlccanadguiidLabelIdle: {
    color: '#FFFFFF59',
  },
});

export default Grnmdlccanadguiidetab;
