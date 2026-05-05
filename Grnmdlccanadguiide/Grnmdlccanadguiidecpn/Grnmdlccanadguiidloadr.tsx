import {Image, ScrollView, StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const htmlloader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loader {
      --main-size: 4em;
      --text-color: #ffffff;
      --shine-color: #ffffff40;
      --shadow-color: #aaaaaa;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      user-select: none;
      position: relative;
      font-size: var(--main-size);
      font-weight: 900;
      text-transform: uppercase;
      color: var(--text-color);
      width: 7.3em;
      height: 1em;
      filter: drop-shadow(0 0 0.05em var(--shine-color));
      font-family: Arial, sans-serif;
    }

    .loader .text {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      position: absolute;
    }

    .loader .text:nth-child(1) {
      clip-path: polygon(0% 0%, 11.11% 0%, 11.11% 100%, 0% 100%);
      font-size: calc(var(--main-size) / 20);
      margin-left: -2.1em;
      opacity: 0.6;
    }

    .loader .text:nth-child(2) {
      clip-path: polygon(11.11% 0%, 22.22% 0%, 22.22% 100%, 11.11% 100%);
      font-size: calc(var(--main-size) / 16);
      margin-left: -0.98em;
      opacity: 0.7;
    }

    .loader .text:nth-child(3) {
      clip-path: polygon(22.22% 0%, 33.33% 0%, 33.33% 100%, 22.22% 100%);
      font-size: calc(var(--main-size) / 13);
      margin-left: -0.33em;
      opacity: 0.8;
    }

    .loader .text:nth-child(4) {
      clip-path: polygon(33.33% 0%, 44.44% 0%, 44.44% 100%, 33.33% 100%);
      font-size: calc(var(--main-size) / 11);
      margin-left: -0.05em;
      opacity: 0.9;
    }

    .loader .text:nth-child(5) {
      clip-path: polygon(44.44% 0%, 55.55% 0%, 55.55% 100%, 44.44% 100%);
      font-size: calc(var(--main-size) / 10);
      margin-left: 0em;
      opacity: 1;
    }

    .loader .text:nth-child(6) {
      clip-path: polygon(55.55% 0%, 66.66% 0%, 66.66% 100%, 55.55% 100%);
      font-size: calc(var(--main-size) / 11);
      margin-left: 0.05em;
      opacity: 0.9;
    }

    .loader .text:nth-child(7) {
      clip-path: polygon(66.66% 0%, 77.77% 0%, 77.77% 100%, 66.66% 100%);
      font-size: calc(var(--main-size) / 13);
      margin-left: 0.33em;
      opacity: 0.8;
    }

    .loader .text:nth-child(8) {
      clip-path: polygon(77.77% 0%, 88.88% 0%, 88.88% 100%, 77.77% 100%);
      font-size: calc(var(--main-size) / 16);
      margin-left: 0.98em;
      opacity: 0.7;
    }

    .loader .text:nth-child(9) {
      clip-path: polygon(88.88% 0%, 100% 0%, 100% 100%, 88.88% 100%);
      font-size: calc(var(--main-size) / 20);
      margin-left: 2.1em;
      opacity: 0.6;
    }

    .loader .text span {
      animation:
        scrolling 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite,
        shadow 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite;
    }

    .loader .text:nth-child(1) span {
      background: linear-gradient(to right, var(--text-color) 4%, var(--shadow-color) 7%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(2) span {
      background: linear-gradient(to right, var(--text-color) 9%, var(--shadow-color) 13%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(3) span {
      background: linear-gradient(to right, var(--text-color) 15%, var(--shadow-color) 18%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(4) span {
      background: linear-gradient(to right, var(--text-color) 20%, var(--shadow-color) 23%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(6) span {
      background: linear-gradient(to right, var(--shadow-color) 29%, var(--text-color) 32%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(7) span {
      background: linear-gradient(to right, var(--shadow-color) 34%, var(--text-color) 37%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(8) span {
      background: linear-gradient(to right, var(--shadow-color) 39%, var(--text-color) 42%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .text:nth-child(9) span {
      background: linear-gradient(to right, var(--shadow-color) 45%, var(--text-color) 48%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .loader .line {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 0.05em;
      width: calc(var(--main-size) / 2);
      margin-top: 0.9em;
      border-radius: 0.05em;
    }

    .loader .line::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: var(--text-color);
      opacity: 0.3;
    }

    .loader .line::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: var(--text-color);
      border-radius: 0.05em;
      transform: translateX(-90%);
      animation: wobble 2s cubic-bezier(0.5, 0.8, 0.5, 0.2) infinite;
    }

    @keyframes wobble {
      0% { transform: translateX(-90%); }
      50% { transform: translateX(90%); }
      100% { transform: translateX(-90%); }
    }

    @keyframes scrolling {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes shadow {
      0% { background-position: -98% 0; }
      100% { background-position: 102% 0; }
    }
  </style>
</head>
<body>
  <div class="loader">
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="text"><span>Loading</span></div>
    <div class="line"></div>
  </div>
</body>
</html>`;

const Grnmdlccanadguiidloadr = () => {
  const grnmdlccanadguiidNavigation = useNavigation();

  {/** 
  useEffect(() => {
    const grnmdlccanadguiidTimer = setTimeout(() => {
      grnmdlccanadguiidNavigation.navigate('Grnmdlccanadguiideon' as never);
    }, 6000);

    return () => {
      clearTimeout(grnmdlccanadguiidTimer);
    };
  }, [grnmdlccanadguiidNavigation]);
*/}
  return (
    <View style={styles.grnmdlccanadguiidimageBg}>
      <ScrollView
        contentContainerStyle={styles.grnmdlccanadguiidscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/i/grnmdlccanaload.png')}
            style={{
              top: 20,
            }}
          />
        </View>
        <View style={styles.grnmdlccanadguiidbottomWrap}>
          <WebView
            source={{html: htmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 50, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Grnmdlccanadguiidloadr;

const styles = StyleSheet.create({
  grnmdlccanadguiidimageBg: {
    flex: 1,
    backgroundColor: '#0A1810',
  },
  grnmdlccanadguiidscrollContent: {
    flexGrow: 1,
  },

  grnmdlccanadguiidbottomWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  grnmdlccanadguiidbottomText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'DmSans-Regular',
    marginTop: 11,
    textAlign: 'center',
  },
  grnmdlccanadguiidwebviewDock: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
});
