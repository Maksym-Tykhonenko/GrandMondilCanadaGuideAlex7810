// explore
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type GrnmdlccanadguiideexplrCategory =
  | 'All'
  | 'Ice'
  | 'Wild'
  | 'Sky'
  | 'Hidden'
  | 'Stays';

type GrnmdlccanadguiideexplrLocation = {
  id: string;
  title: string;
  category: Exclude<GrnmdlccanadguiideexplrCategory, 'All'>;
  province: string;
  coordinates: {lat: number; lon: number};
  description: string;
  image: ImageSourcePropType;
};

const grnmdlccanadguiideexplrLocations: GrnmdlccanadguiideexplrLocation[] = [
  {
    id: 'ice-johnston-canyon',
    title: 'Ice Canyon Johnston',
    category: 'Ice',
    coordinates: {lat: 51.2436, lon: -115.8397},
    image: require('../../assets/i/grnmdlccanaloc1.png'),
    province: 'Alberta',
    description:
      'In winter, Johnston Canyon turns into a real ice world, where waterfalls completely or partially freeze, forming huge walls of ice and long transparent icicles.',
  },
  {
    id: 'ice-abraham-lake',
    title: 'Abraham Frozen Lake',
    image: require('../../assets/i/grnmdlccanaloc2.png'),
    category: 'Ice',
    coordinates: {lat: 52.266, lon: -117.24},
    province: 'Alberta',
    description:
      'Abraham Lake is famous for frozen methane bubbles under transparent ice, creating a surreal "another world" effect.',
  },
  {
    id: 'ice-icefields-parkway',
    title: 'Icefields Parkway Glacier',
    image: require('../../assets/i/grnmdlccanaloc3.png'),
    category: 'Ice',
    coordinates: {lat: 52.22, lon: -117.225},
    province: 'Alberta',
    description:
      'A winter journey through a glacial landscape with huge "frozen waves" and rugged, isolated views.',
  },
  {
    id: 'ice-montmorency-falls',
    title: 'Montmorency Frozen Falls',
    image: require('../../assets/i/grnmdlccanaloc4.png'),
    category: 'Ice',
    coordinates: {lat: 46.89, lon: -71.147},
    province: 'Quebec',
    description:
      'In winter it partially freezes, forming a giant "ice cone" at the base and dramatic ice formations.',
  },
  {
    id: 'ice-churchill-ice-coast',
    title: 'Churchill Ice Coast',
    image: require('../../assets/i/grnmdlccanaloc5.png'),
    category: 'Ice',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    description:
      'Hudson Bay freezes into an Arctic-like expanse — harsh, isolated, and unforgettable.',
  },
  {
    id: 'ice-iceberg-alley',
    title: 'Iceberg Alley',
    image: require('../../assets/i/grnmdlccanaloc6.png'),
    category: 'Ice',
    coordinates: {lat: 49.5, lon: -53.0},
    province: 'Newfoundland and Labrador',
    description:
      'A coastline where giant icebergs drift close to shore — bright blue, ancient, and massive.',
  },
  {
    id: 'wild-churchill-polar-zone',
    title: 'Churchill Polar Zone',
    image: require('../../assets/i/grnmdlccanaloc7.png'),
    category: 'Wild',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    description:
      'One of the world\u2019s best places to watch polar bears in the wild from protected vehicles.',
  },
  {
    id: 'wild-great-bear-rainforest',
    title: 'Great Bear Rainforest',
    image: require('../../assets/i/grnmdlccanaloc8.png'),
    category: 'Wild',
    coordinates: {lat: 52.7, lon: -128.2},
    province: 'British Columbia',
    description:
      'Remote coastal forest home to the rare Kermode bear and rich wildlife in a misty atmosphere.',
  },
  {
    id: 'wild-algonquin-moose-trails',
    title: 'Algonquin Moose Trails',
    image: require('../../assets/i/grnmdlccanaloc9.png'),
    category: 'Wild',
    coordinates: {lat: 45.8372, lon: -78.379},
    province: 'Ontario',
    description:
      'One of the best places to spot moose at dawn and dusk near roads and lakes.',
  },
  {
    id: 'wild-pacific-whale-coast',
    title: 'Pacific Whale Coast',
    image: require('../../assets/i/grnmdlccanaloc10.png'),
    category: 'Wild',
    coordinates: {lat: 49.3, lon: -124.8},
    province: 'British Columbia',
    description:
      'See orcas, gray whales, and humpbacks during migration — often very close to boats.',
  },
  {
    id: 'wild-jasper-wolf-valley',
    title: 'Jasper Wolf Valley',
    image: require('../../assets/i/grnmdlccanaloc11.png'),
    category: 'Wild',
    coordinates: {lat: 52.8737, lon: -118.0814},
    province: 'Alberta',
    description:
      'Remote Jasper areas where wolf howls carry far, creating a truly wild, pristine mood.',
  },
  {
    id: 'wild-seal-river-wilderness',
    title: 'Seal River Wilderness',
    image: require('../../assets/i/grnmdlccanaloc12.png'),
    category: 'Wild',
    coordinates: {lat: 59.0, lon: -93.8},
    province: 'Manitoba',
    description:
      'A remote expedition area with polar bears, caribou, and arctic foxes — reach by plane only.',
  },
  {
    id: 'sky-yellowknife-aurora-field',
    title: 'Yellowknife Aurora Field',
    image: require('../../assets/i/grnmdlccanaloc13.png'),
    category: 'Sky',
    coordinates: {lat: 62.454, lon: -114.3718},
    province: 'Northwest Territories',
    description:
      'Dry climate and clear skies make Yellowknife one of the best places to see auroras.',
  },
  {
    id: 'sky-jasper-dark-sky-preserve',
    title: 'Jasper Dark Sky Preserve',
    image: require('../../assets/i/grnmdlccanaloc14.png'),
    category: 'Sky',
    coordinates: {lat: 52.8737, lon: -118.0814},
    province: 'Alberta',
    description:
      'Thousands of stars, the Milky Way, and meteor showers — plus the Dark Sky Festival.',
  },
  {
    id: 'sky-churchill-aurora-coast',
    title: 'Churchill Aurora Coast',
    image: require('../../assets/i/grnmdlccanaloc15.png'),
    category: 'Sky',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    description:
      'Auroras over an icy coastline almost daily in winter — high contrast, unforgettable.',
  },
  {
    id: 'sky-grasslands-star-field',
    title: 'Grasslands Star Field',
    image: require('../../assets/i/grnmdlccanaloc16.png'),
    category: 'Sky',
    coordinates: {lat: 49.2, lon: -107.7},
    province: 'Saskatchewan',
    description:
      'One of the darkest horizons in Canada — the Milky Way is visible to the naked eye.',
  },
  {
    id: 'sky-mont-megantic-sky-reserve',
    title: 'Mont-M\u00e9gantic Sky Reserve',
    image: require('../../assets/i/grnmdlccanaloc17.png'),
    category: 'Sky',
    coordinates: {lat: 45.455, lon: -71.152},
    province: 'Quebec',
    description:
      'An international dark sky reserve with an observatory and protected night sky.',
  },
  {
    id: 'sky-whitehorse-aurora-valley',
    title: 'Whitehorse Aurora Valley',
    image: require('../../assets/i/grnmdlccanaloc18.png'),
    category: 'Sky',
    coordinates: {lat: 60.7212, lon: -135.0568},
    province: 'Yukon',
    description:
      'Clean air and little artificial lighting make aurora viewing spectacular outside the city.',
  },
  {
    id: 'hidden-takakkaw-hidden-falls',
    title: 'Takakkaw Hidden Falls',
    image: require('../../assets/i/grnmdlccanaloc19.png'),
    category: 'Hidden',
    coordinates: {lat: 51.7217, lon: -116.4829},
    province: 'British Columbia',
    description:
      'One of the highest falls in Canada — remote and less visited, surrounded by glaciers.',
  },
  {
    id: 'hidden-spotted-lake-secret',
    title: 'Spotted Lake Secret',
    image: require('../../assets/i/grnmdlccanaloc20.png'),
    category: 'Hidden',
    coordinates: {lat: 49.082, lon: -119.567},
    province: 'British Columbia',
    description:
      'A strange mineral lake with colorful "spots" in summer — looks like a natural anomaly.',
  },
  {
    id: 'hidden-hopewell-hidden-rocks',
    title: 'Hopewell Hidden Rocks',
    image: require('../../assets/i/grnmdlccanaloc21.png'),
    category: 'Hidden',
    coordinates: {lat: 45.821, lon: -64.576},
    province: 'New Brunswick',
    description:
      'At low tide you can walk the ocean floor; hours later water covers everything again.',
  },
  {
    id: 'hidden-haida-gwaii-lost-islands',
    title: 'Haida Gwaii Lost Islands',
    image: require('../../assets/i/grnmdlccanaloc22.png'),
    category: 'Hidden',
    coordinates: {lat: 53.25, lon: -132.0},
    province: 'British Columbia',
    description:
      'Isolated islands with preserved Haida culture, foggy ocean mood, and untouched nature.',
  },
  {
    id: 'hidden-pingualuit-crater-lake',
    title: 'Pingualuit Crater Lake',
    image: require('../../assets/i/grnmdlccanaloc23.png'),
    category: 'Hidden',
    coordinates: {lat: 61.283, lon: -73.676},
    province: 'Quebec',
    description:
      'A perfectly round crater lake with crystal clear water far from settlements.',
  },
  {
    id: 'hidden-little-limestone-blue-pools',
    title: 'Little Limestone Blue Pools',
    image: require('../../assets/i/grnmdlccanaloc24.png'),
    category: 'Hidden',
    coordinates: {lat: 56.82, lon: -99.53},
    province: 'Manitoba',
    description:
      'A remote lake known for changing water color from turquoise to rich blue with temperature.',
  },
  {
    id: 'stays-free-spirit-spheres',
    title: 'Free Spirit Spheres',
    image: require('../../assets/i/grnmdlccanaloc25.png'),
    category: 'Stays',
    coordinates: {lat: 49.308, lon: -124.739},
    province: 'British Columbia',
    description:
      'Suspended spheres between trees on Vancouver Island — cozy, quiet, and perfect for detox.',
  },
  {
    id: 'stays-hotel-de-glace',
    title: 'H\u00f4tel de Glace',
    image: require('../../assets/i/grnmdlccanaloc26.png'),
    category: 'Stays',
    coordinates: {lat: 46.997, lon: -71.295},
    province: 'Quebec',
    description:
      'A snow-and-ice hotel open only in winter — rooms and d\u00e9cor carved from ice blocks.',
  },
  {
    id: 'stays-clayoquot-wilderness-lodge',
    title: 'Clayoquot Wilderness Lodge',
    image: require('../../assets/i/grnmdlccanaloc27.png'),
    category: 'Stays',
    coordinates: {lat: 49.283, lon: -126.08},
    province: 'British Columbia',
    description:
      'Luxury eco-resort with safari tents, kayaking, hiking, and wildlife watching in the wild.',
  },
  {
    id: 'stays-fogo-island-inn',
    title: 'Fogo Island Inn',
    image: require('../../assets/i/grnmdlccanaloc28.png'),
    category: 'Stays',
    coordinates: {lat: 49.7165, lon: -54.1797},
    province: 'Newfoundland and Labrador',
    description:
      'Modern architecture on a rocky coast — minimalism, traditions, silence, and ocean views.',
  },
  {
    id: 'stays-arctic-treehouse-canada-style',
    title: 'Arctic TreeHouse Hotel (Canada style experience)',
    image: require('../../assets/i/grnmdlccanaloc29.png'),
    category: 'Stays',
    coordinates: {lat: 60.0, lon: -110.0},
    province: 'Northwest Territories',
    description:
      'Remote stays with panoramic windows oriented to the sky — watch auroras from bed.',
  },
  {
    id: 'stays-floating-cabins-lake',
    title: 'Floating Cabins Lake',
    image: require('../../assets/i/grnmdlccanaloc30.png'),
    category: 'Stays',
    coordinates: {lat: 50.1, lon: -122.95},
    province: 'British Columbia',
    description:
      'Cabins floating on calm lakes — misty mornings, sunset terraces, and tranquil waves.',
  },
];

const grnmdlccanadguiideexplrCategories: Array<{
  id: GrnmdlccanadguiideexplrCategory;
  title: string;
  emoji: string;
  gradient: [string, string];
}> = [
  {id: 'All', title: 'All', emoji: '', gradient: ['#2A4A1A', '#4A8A2A']},
  {
    id: 'Ice',
    title: 'Ice',
    emoji: '❄️',
    gradient: ['#1A3A5C', '#2E6FA8'],
  },
  {
    id: 'Wild',
    title: 'Wild',
    emoji: '🐺',
    gradient: ['#1A4A2E', '#2E7A4E'],
  },
  {
    id: 'Sky',
    title: 'Sky',
    emoji: '✨',
    gradient: ['#3A1A5C', '#6E2EA8'],
  },
  {
    id: 'Hidden',
    title: 'Hidden',
    emoji: '🔍',
    gradient: ['#5C3A1A', '#A8702E'],
  },
  {
    id: 'Stays',
    title: 'Stays',
    emoji: '🏡',
    gradient: ['#5C1A3A', '#A82E6E'],
  },
];

const Grnmdlccanadguiideexplr = () => {
  const grnmdlccanadguiideexplrNavigation = useNavigation<any>();
  const [
    grnmdlccanadguiideexplrActiveCategory,
    setGrnmdlccanadguiideexplrActiveCategory,
  ] = useState<GrnmdlccanadguiideexplrCategory>('All');

  const grnmdlccanadguiideexplrFiltered = useMemo(() => {
    if (grnmdlccanadguiideexplrActiveCategory === 'All') {
      return grnmdlccanadguiideexplrLocations;
    }
    return grnmdlccanadguiideexplrLocations.filter(
      x => x.category === grnmdlccanadguiideexplrActiveCategory,
    );
  }, [grnmdlccanadguiideexplrActiveCategory]);

  useFocusEffect(
    useCallback(() => {
      setGrnmdlccanadguiideexplrActiveCategory('All');
    }, []),
  );

  const grnmdlccanadguiideexplrCounts = useMemo(() => {
    const grnmdlccanadguiideexplrCountsMap = {
      All: grnmdlccanadguiideexplrLocations.length,
      Ice: 0,
      Wild: 0,
      Sky: 0,
      Hidden: 0,
      Stays: 0,
    } as Record<GrnmdlccanadguiideexplrCategory, number>;

    grnmdlccanadguiideexplrLocations.forEach(l => {
      grnmdlccanadguiideexplrCountsMap[l.category] += 1;
    });

    return grnmdlccanadguiideexplrCountsMap;
  }, []);

  return (
    <View style={styles.grnmdlccanadguiideexplrroot}>
      <FlatList
        data={grnmdlccanadguiideexplrFiltered}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grnmdlccanadguiideexplrlistcontent}
        ListHeaderComponent={
          <View style={styles.grnmdlccanadguiideexplrheader}>
            <View style={styles.grnmdlccanadguiideexplrheaderpad}>
              <Text style={styles.grnmdlccanadguiideexplrkicker}>
                CANADA EXPLORE
              </Text>
              <Text style={styles.grnmdlccanadguiideexplrh1}>Locations</Text>
            </View>

            <View style={styles.grnmdlccanadguiideexplrcategoriesrow}>
              <FlatList
                data={grnmdlccanadguiideexplrCategories}
                keyExtractor={i => i.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                  styles.grnmdlccanadguiideexplrcategoriescontent
                }
                renderItem={({item}) => {
                  const grnmdlccanadguiideexplrIsActive =
                    item.id === grnmdlccanadguiideexplrActiveCategory;
                  return (
                    <Pressable
                      onPress={() =>
                        setGrnmdlccanadguiideexplrActiveCategory(item.id)
                      }
                      style={styles.grnmdlccanadguiideexplrcategoryouter}>
                      <LinearGradient
                        colors={item.gradient}
                        style={[
                          styles.grnmdlccanadguiideexplrcategorycard,
                          grnmdlccanadguiideexplrIsActive &&
                            styles.grnmdlccanadguiideexplrcategorycardactive,
                        ]}>
                        <View
                          style={styles.grnmdlccanadguiideexplrcategoryinner}>
                          <Text
                            style={[
                              styles.grnmdlccanadguiideexplrcategorytitle,
                              grnmdlccanadguiideexplrIsActive &&
                                styles.grnmdlccanadguiideexplrcategorytitleactive,
                            ]}>
                            {item.title}
                          </Text>
                          <Text
                            style={styles.grnmdlccanadguiideexplrcategorycount}>
                            {grnmdlccanadguiideexplrCounts[item.id]} spots
                          </Text>
                          <Text
                            style={styles.grnmdlccanadguiideexplrcategoryemoji}>
                            {item.emoji ? `${item.emoji} ` : '🍁'}
                          </Text>
                        </View>
                      </LinearGradient>
                    </Pressable>
                  );
                }}
              />
            </View>

            <Text style={styles.grnmdlccanadguiideexplrsmallmuted}>
              {grnmdlccanadguiideexplrFiltered.length} locations
            </Text>
          </View>
        }
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() =>
                grnmdlccanadguiideexplrNavigation.navigate(
                  'Grnmdlccanadguiidelocdtl' as never,
                  {locationId: item.id} as never,
                )
              }
              style={styles.grnmdlccanadguiideexplrlocationcard}>
              <Image
                source={item.image}
                style={styles.grnmdlccanadguiideexplrlocationthumb}
              />
              <View style={styles.grnmdlccanadguiideexplrlocationtoprow}>
                <View style={styles.grnmdlccanadguiideexplrlocationpill}>
                  <Text style={styles.grnmdlccanadguiideexplrlocationpilltext}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <View style={styles.grnmdlccanadguiideexplrlocationbody}>
                <Text style={styles.grnmdlccanadguiideexplrlocationtitle}>
                  {item.title}
                </Text>
                <Text style={styles.grnmdlccanadguiideexplrlocationprovince}>
                  {item.province}
                </Text>
                <Text
                  numberOfLines={2}
                  style={styles.grnmdlccanadguiideexplrlocationdesc}>
                  {item.description}
                </Text>
              </View>
              <Image
                source={require('../../assets/i/grnmdlccanaopn.png')}
                style={styles.grnmdlccanadguiideexplrlocationchevron}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Grnmdlccanadguiideexplr;

const styles = StyleSheet.create({
  grnmdlccanadguiideexplrcategorycard: {
    width: 105,
    height: 74,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1C',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  grnmdlccanadguiideexplrcategorycardactive: {
    borderColor: '#CCB500',
    width: 135,
  },

  grnmdlccanadguiideexplrroot: {flex: 1, backgroundColor: '#0A1810'},

  grnmdlccanadguiideexplrlistcontent: {
    paddingTop: 60,
    paddingBottom: 120,
  },

  grnmdlccanadguiideexplrheader: {paddingBottom: 14},
  grnmdlccanadguiideexplrheaderpad: {paddingHorizontal: 20},
  grnmdlccanadguiideexplrkicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiideexplrh1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
  grnmdlccanadguiideexplrsmallmuted: {
    color: '#FFFFFF50',
    marginTop: 24,
    fontWeight: '500',
    paddingHorizontal: 30,
  },

  grnmdlccanadguiideexplrcategoriesrow: {marginTop: 14},
  grnmdlccanadguiideexplrcategoriescontent: {paddingRight: 20, paddingLeft: 20},
  grnmdlccanadguiideexplrcategoryouter: {marginRight: 12},

  grnmdlccanadguiideexplrcategoryinner: {padding: 12, overflow: 'hidden'},
  grnmdlccanadguiideexplrcategorytitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  grnmdlccanadguiideexplrcategorytitleactive: {color: '#FFFFFF'},
  grnmdlccanadguiideexplrcategorycount: {
    color: '#FFFFFF66',
    fontWeight: '700',
    fontSize: 11,
  },
  grnmdlccanadguiideexplrcategoryemoji: {
    fontSize: 32,
    position: 'absolute',
    bottom: -6,
    right: -6,
    opacity: 0.5,
  },

  grnmdlccanadguiideexplrlocationcard: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#152B1CCC',
    borderColor: '#FFFFFF0F',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '86%',
    alignSelf: 'center',
    minHeight: 94,
  },
  grnmdlccanadguiideexplrlocationthumb: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF10',
  },
  grnmdlccanadguiideexplrlocationbody: {flex: 1, padding: 10},
  grnmdlccanadguiideexplrlocationtoprow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 0,
    bottom: 0,
  },
  grnmdlccanadguiideexplrlocationpill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#0000008C',
  },
  grnmdlccanadguiideexplrlocationpilltext: {
    color: '#CCB500',
    fontWeight: '700',
    fontSize: 10,
  },
  grnmdlccanadguiideexplrlocationtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  grnmdlccanadguiideexplrlocationprovince: {
    color: '#FFFFFF70',
    fontWeight: '500',
    marginTop: 4,
    fontSize: 10,
  },
  grnmdlccanadguiideexplrlocationdesc: {
    color: '#FFFFFF55',
    fontWeight: '500',
    marginTop: 4,
    fontSize: 10,
  },
  grnmdlccanadguiideexplrlocationchevron: {
    right: 8,
  },
});
