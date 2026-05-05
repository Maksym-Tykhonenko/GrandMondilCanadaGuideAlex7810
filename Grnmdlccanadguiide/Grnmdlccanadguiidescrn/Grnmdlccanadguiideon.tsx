// onboarding

import {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';

const grnmdlccanadguiideonData = [
  {
    id: 1,
    title: 'Welcome to CanadaExplore',
    backgroundImage: require('../../assets/i/grnmdlccanadonbg1.png'),
    description: `Hey, I'm Ethan — your personal Canadian wilderness guide. Get ready to discover the most breathtaking locations in the Great White North.`,
    sectionTitle: `🇨🇦 Your Guide`,
    image: require('../../assets/i/grnmdlccanadon1.png'),
  },
  {
    id: 2,
    title: 'Explore Hidden Gems',
    description: `From frozen glaciers to hidden waterfalls and sacred Indigenous sites — I'll take you places most tourists never discover.`,
    backgroundImage: require('../../assets/i/grnmdlccanadonbg2.png'),
    image: require('../../assets/i/grnmdlccanadon2.png'),
    sectionTitle: `🗺️ Explore`,
  },
  {
    id: 3,
    title: 'Save & Navigate With Ease',
    description: `Save your favorite spots and navigate with our interactive map. Every location has full details, coordinates, and directions.`,
    backgroundImage: require('../../assets/i/grnmdlccanadonbg3.png'),
    image: require('../../assets/i/grnmdlccanadon3.png'),
    sectionTitle: `📍 Navigate`,
  },
  {
    id: 4,
    title: 'Learn Fascinating Canadian Facts',
    description: `Dive into wild, mysterious, and extreme facts about Canada. Challenge yourself with trivia and earn maple leaf coins.`,
    backgroundImage: require('../../assets/i/grnmdlccanadonbg4.png'),
    image: require('../../assets/i/grnmdlccanadon4.png'),
    sectionTitle: `🍁 Discover`,
  },
  {
    id: 5,
    title: 'Collect Premium Wallpapers',
    description:
      'Earn maple leaves through quizzes and unlock stunning Canadian landscape wallpapers. The more you learn, the more you collect.',
    backgroundImage: require('../../assets/i/grnmdlccanadonbg5.png'),
    image: require('../../assets/i/grnmdlccanadon5.png'),
    sectionTitle: `🖼️ Collect`,
  },
];

const Grnmdlccanadguiideon = () => {
  const [grnmdlccanadguiideoncurrentIdx, setGrnmdlccanadguiideonCurrentIdx] =
    useState(0);
  const navigation = useNavigation();

  const grnmdlccanadguiideonnext = () => {
    grnmdlccanadguiideoncurrentIdx === 4
      ? navigation.navigate('Grnmdlccanadguiidetab' as never)
      : setGrnmdlccanadguiideonCurrentIdx(grnmdlccanadguiideoncurrentIdx + 1);
  };

  return (
    <ImageBackground
      source={
        grnmdlccanadguiideonData[grnmdlccanadguiideoncurrentIdx].backgroundImage
      }
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grnmdlccanadguiideoncontainer}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 50,
              zIndex: 100,
            }}>
            <TouchableOpacity
              style={styles.grnmdlccanadguiideonskipbtn}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Grnmdlccanadguiidetab' as never)
              }>
              <Text style={styles.grnmdlccanadguiideonskipbtntext}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              overflow: 'hidden',
              marginTop: 55,
            }}>
            <Image
              source={
                grnmdlccanadguiideonData[grnmdlccanadguiideoncurrentIdx].image
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingTop: 50,
              marginBottom: 16,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={require('../../assets/i/grnmdlccantm.png')} />
              <View>
                <Text style={styles.grnmdlccanadguiideontitle}>
                  ETHAN MACLEOD
                </Text>
                <Text style={styles.grnmdlccanadguiideondescription}>
                  Canadian Wilderness Guide
                </Text>
              </View>
            </View>

            <View style={styles.grnmdlccanadguiideonguidewrap}>
              <Text style={styles.grnmdlccanadguiideonguidext}>
                {
                  grnmdlccanadguiideonData[grnmdlccanadguiideoncurrentIdx]
                    .sectionTitle
                }
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.grnmdlccanadguiideonwelcometext}>
              {grnmdlccanadguiideonData[grnmdlccanadguiideoncurrentIdx].title}
            </Text>
            <Text style={styles.grnmdlccanadguiideonwelcdescr}>
              {
                grnmdlccanadguiideonData[grnmdlccanadguiideoncurrentIdx]
                  .description
              }
            </Text>
          </View>

          <View style={styles.grnmdlccanadguiideonpagination}>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.grnmdlccanadguiideonpaginationitem,
                  {
                    backgroundColor:
                      grnmdlccanadguiideoncurrentIdx === idx
                        ? '#CCB500'
                        : '#FFFFFF4D',
                    width: grnmdlccanadguiideoncurrentIdx === idx ? 22 : 5,
                  },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={{width: '100%'}}
            activeOpacity={0.8}
            onPress={grnmdlccanadguiideonnext}>
            <LinearGradient
              colors={['#CCB500', '#A89300']}
              style={styles.grnmdlccanadguiideonwelcbtn}>
              <Text style={styles.grnmdlccanadguiideonwelctext}>
                {grnmdlccanadguiideoncurrentIdx === 4
                  ? `Start Exploring`
                  : 'Next'}
              </Text>
              <Image source={require('../../assets/i/grnmdlccanadnxt.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  grnmdlccanadguiideoncontainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  grnmdlccanadguiideonpagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 26,
  },
  grnmdlccanadguiideonpaginationitem: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#FFFFFF4D',
  },
  grnmdlccanadguiideonpaginationitemactive: {
    backgroundColor: '#C9A84C',
  },
  grnmdlccanadguiideonskipbtn: {
    alignItems: 'center',
    gap: 6,
    width: 70,
    height: 33,
  },
  grnmdlccanadguiideonskipbtntext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF99',
  },
  grnmdlccanadguiideontitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#CCB500',
    marginBottom: 4,
  },
  grnmdlccanadguiideondescription: {
    fontSize: 10,
    fontWeight: '400',
    color: '#FFFFFFB2',
  },
  grnmdlccanadguiideonwelcometext: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  grnmdlccanadguiideonwelcdescr: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFFA6',
    marginTop: 10,
  },
  grnmdlccanadguiideonwelcbtn: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9A84C66',
    marginTop: 30,

    flexDirection: 'row',
    gap: 5,
  },
  grnmdlccanadguiideonwelctext: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1810',
  },
  grnmdlccanadguiideonguidewrap: {
    backgroundColor: '#CCB50026',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CCB5004D',
    height: 32,
    minWidth: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grnmdlccanadguiideonguidext: {
    fontSize: 10,
    fontWeight: '400',
    color: '#CCB500',
  },
});

export default Grnmdlccanadguiideon;
