import {
  grnmdlccanadguiideGetSavedIds,
  grnmdlccanadguiideToggleSavedId,
} from '../Grnmdlccanadguiideutil/grnmdlccanadguiidesaved';

import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';

import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

type GrnmdlccanadguiidesavdCategory =
  | 'Ice'
  | 'Wild'
  | 'Sky'
  | 'Hidden'
  | 'Stays';

type GrnmdlccanadguiidesavdLocation = {
  id: string;
  title: string;
  category: GrnmdlccanadguiidesavdCategory;
  province: string;
  coordinates: {lat: number; lon: number};
  image: ImageSourcePropType;
};

const grnmdlccanadguiidesavdAllLocations: GrnmdlccanadguiidesavdLocation[] = [
  {
    id: 'ice-johnston-canyon',
    title: 'Ice Canyon Johnston',
    category: 'Ice',
    coordinates: {lat: 51.2436, lon: -115.8397},
    province: 'Alberta',
    image: require('../../assets/i/grnmdlccanaloc1.png'),
  },
  {
    id: 'ice-abraham-lake',
    title: 'Abraham Frozen Lake',
    category: 'Ice',
    coordinates: {lat: 52.266, lon: -117.24},
    province: 'Alberta',
    image: require('../../assets/i/grnmdlccanaloc2.png'),
  },
  {
    id: 'ice-icefields-parkway',
    title: 'Icefields Parkway Glacier',
    category: 'Ice',
    coordinates: {lat: 52.22, lon: -117.225},
    province: 'Alberta',
    image: require('../../assets/i/grnmdlccanaloc3.png'),
  },
  {
    id: 'ice-montmorency-falls',
    title: 'Montmorency Frozen Falls',
    category: 'Ice',
    coordinates: {lat: 46.89, lon: -71.147},
    province: 'Quebec',
    image: require('../../assets/i/grnmdlccanaloc4.png'),
  },
  {
    id: 'ice-churchill-ice-coast',
    title: 'Churchill Ice Coast',
    category: 'Ice',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    image: require('../../assets/i/grnmdlccanaloc5.png'),
  },
  {
    id: 'ice-iceberg-alley',
    title: 'Iceberg Alley',
    category: 'Ice',
    coordinates: {lat: 49.5, lon: -53.0},
    province: 'Newfoundland and Labrador',
    image: require('../../assets/i/grnmdlccanaloc6.png'),
  },
  {
    id: 'wild-churchill-polar-zone',
    title: 'Churchill Polar Zone',
    category: 'Wild',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    image: require('../../assets/i/grnmdlccanaloc7.png'),
  },
  {
    id: 'wild-great-bear-rainforest',
    title: 'Great Bear Rainforest',
    category: 'Wild',
    coordinates: {lat: 52.7, lon: -128.2},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc8.png'),
  },
  {
    id: 'wild-algonquin-moose-trails',
    title: 'Algonquin Moose Trails',
    category: 'Wild',
    coordinates: {lat: 45.8372, lon: -78.379},
    province: 'Ontario',
    image: require('../../assets/i/grnmdlccanaloc9.png'),
  },
  {
    id: 'wild-pacific-whale-coast',
    title: 'Pacific Whale Coast',
    category: 'Wild',
    coordinates: {lat: 49.3, lon: -124.8},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc10.png'),
  },
  {
    id: 'wild-jasper-wolf-valley',
    title: 'Jasper Wolf Valley',
    category: 'Wild',
    coordinates: {lat: 52.8737, lon: -118.0814},
    province: 'Alberta',
    image: require('../../assets/i/grnmdlccanaloc11.png'),
  },
  {
    id: 'wild-seal-river-wilderness',
    title: 'Seal River Wilderness',
    category: 'Wild',
    coordinates: {lat: 59.0, lon: -93.8},
    province: 'Manitoba',
    image: require('../../assets/i/grnmdlccanaloc12.png'),
  },
  {
    id: 'sky-yellowknife-aurora-field',
    title: 'Yellowknife Aurora Field',
    category: 'Sky',
    coordinates: {lat: 62.454, lon: -114.3718},
    province: 'Northwest Territories',
    image: require('../../assets/i/grnmdlccanaloc13.png'),
  },
  {
    id: 'sky-jasper-dark-sky-preserve',
    title: 'Jasper Dark Sky Preserve',
    category: 'Sky',
    coordinates: {lat: 52.8737, lon: -118.0814},
    province: 'Alberta',
    image: require('../../assets/i/grnmdlccanaloc14.png'),
  },
  {
    id: 'sky-churchill-aurora-coast',
    title: 'Churchill Aurora Coast',
    category: 'Sky',
    coordinates: {lat: 58.7684, lon: -94.165},
    province: 'Manitoba',
    image: require('../../assets/i/grnmdlccanaloc15.png'),
  },
  {
    id: 'sky-grasslands-star-field',
    title: 'Grasslands Star Field',
    category: 'Sky',
    coordinates: {lat: 49.2, lon: -107.7},
    province: 'Saskatchewan',
    image: require('../../assets/i/grnmdlccanaloc16.png'),
  },
  {
    id: 'sky-mont-megantic-sky-reserve',
    title: 'Mont-M\u00e9gantic Sky Reserve',
    category: 'Sky',
    coordinates: {lat: 45.455, lon: -71.152},
    province: 'Quebec',
    image: require('../../assets/i/grnmdlccanaloc17.png'),
  },
  {
    id: 'sky-whitehorse-aurora-valley',
    title: 'Whitehorse Aurora Valley',
    category: 'Sky',
    coordinates: {lat: 60.7212, lon: -135.0568},
    province: 'Yukon',
    image: require('../../assets/i/grnmdlccanaloc18.png'),
  },
  {
    id: 'hidden-takakkaw-hidden-falls',
    title: 'Takakkaw Hidden Falls',
    category: 'Hidden',
    coordinates: {lat: 51.7217, lon: -116.4829},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc19.png'),
  },
  {
    id: 'hidden-spotted-lake-secret',
    title: 'Spotted Lake Secret',
    category: 'Hidden',
    coordinates: {lat: 49.082, lon: -119.567},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc20.png'),
  },
  {
    id: 'hidden-hopewell-hidden-rocks',
    title: 'Hopewell Hidden Rocks',
    category: 'Hidden',
    coordinates: {lat: 45.821, lon: -64.576},
    province: 'New Brunswick',
    image: require('../../assets/i/grnmdlccanaloc21.png'),
  },
  {
    id: 'hidden-haida-gwaii-lost-islands',
    title: 'Haida Gwaii Lost Islands',
    category: 'Hidden',
    coordinates: {lat: 53.25, lon: -132.0},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc22.png'),
  },
  {
    id: 'hidden-pingualuit-crater-lake',
    title: 'Pingualuit Crater Lake',
    category: 'Hidden',
    coordinates: {lat: 61.283, lon: -73.676},
    province: 'Quebec',
    image: require('../../assets/i/grnmdlccanaloc23.png'),
  },
  {
    id: 'hidden-little-limestone-blue-pools',
    title: 'Little Limestone Blue Pools',
    category: 'Hidden',
    coordinates: {lat: 56.82, lon: -99.53},
    province: 'Manitoba',
    image: require('../../assets/i/grnmdlccanaloc24.png'),
  },
  {
    id: 'stays-free-spirit-spheres',
    title: 'Free Spirit Spheres',
    category: 'Stays',
    coordinates: {lat: 49.308, lon: -124.739},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc25.png'),
  },
  {
    id: 'stays-hotel-de-glace',
    title: 'H\u00f4tel de Glace',
    category: 'Stays',
    coordinates: {lat: 46.997, lon: -71.295},
    province: 'Quebec',
    image: require('../../assets/i/grnmdlccanaloc26.png'),
  },
  {
    id: 'stays-clayoquot-wilderness-lodge',
    title: 'Clayoquot Wilderness Lodge',
    category: 'Stays',
    coordinates: {lat: 49.283, lon: -126.08},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc27.png'),
  },
  {
    id: 'stays-fogo-island-inn',
    title: 'Fogo Island Inn',
    category: 'Stays',
    coordinates: {lat: 49.7165, lon: -54.1797},
    province: 'Newfoundland and Labrador',
    image: require('../../assets/i/grnmdlccanaloc28.png'),
  },
  {
    id: 'stays-arctic-treehouse-canada-style',
    title: 'Arctic TreeHouse Hotel (Canada style experience)',
    category: 'Stays',
    coordinates: {lat: 60.0, lon: -110.0},
    province: 'Northwest Territories',
    image: require('../../assets/i/grnmdlccanaloc29.png'),
  },
  {
    id: 'stays-floating-cabins-lake',
    title: 'Floating Cabins Lake',
    category: 'Stays',
    coordinates: {lat: 50.1, lon: -122.95},
    province: 'British Columbia',
    image: require('../../assets/i/grnmdlccanaloc30.png'),
  },
];

const grnmdlccanadguiidesavdFmtCoord = (
  v: number,
  pos: string,
  neg: string,
) => {
  const grnmdlccanadguiidesavdHemi = v >= 0 ? pos : neg;
  return `${Math.abs(v).toFixed(3)}\u00b0 ${grnmdlccanadguiidesavdHemi}`;
};

const Grnmdlccanadguiidesavd = () => {
  const grnmdlccanadguiidesavdNavigation = useNavigation<any>();
  const [grnmdlccanadguiidesavdSavedIds, setGrnmdlccanadguiidesavdSavedIds] =
    useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let grnmdlccanadguiidesavdMounted = true;
      grnmdlccanadguiideGetSavedIds().then(ids => {
        if (!grnmdlccanadguiidesavdMounted) {
          return;
        }
        setGrnmdlccanadguiidesavdSavedIds(ids);
      });
      return () => {
        grnmdlccanadguiidesavdMounted = false;
      };
    }, []),
  );

  const grnmdlccanadguiidesavdSavedLocations = useMemo(() => {
    return grnmdlccanadguiidesavdAllLocations.filter(loc =>
      grnmdlccanadguiidesavdSavedIds.includes(loc.id),
    );
  }, [grnmdlccanadguiidesavdSavedIds]);

  const grnmdlccanadguiidesavdHandleRemove = useCallback(
    async (grnmdlccanadguiidesavdId: string) => {
      const grnmdlccanadguiidesavdResult =
        await grnmdlccanadguiideToggleSavedId(grnmdlccanadguiidesavdId);
      setGrnmdlccanadguiidesavdSavedIds(grnmdlccanadguiidesavdResult.ids);
    },
    [],
  );

  const grnmdlccanadguiidesavdEmpty =
    grnmdlccanadguiidesavdSavedLocations.length === 0;

  return (
    <Grnmdlccanadguiidlay>
      <View style={styles.grnmdlccanadguiidesavdroot}>
        <View
          style={[
            styles.grnmdlccanadguiidesavdlistcontent,
            grnmdlccanadguiidesavdEmpty &&
              styles.grnmdlccanadguiidesavdlistcontentempty,
          ]}>
          <View style={styles.grnmdlccanadguiidesavdheaderpad}>
            <Text style={styles.grnmdlccanadguiidesavdkicker}>COLLECTION</Text>
            <View style={styles.grnmdlccanadguiidesavdtitlerow}>
              <Text style={styles.grnmdlccanadguiidesavdh1}>Saved</Text>
              {!grnmdlccanadguiidesavdEmpty && (
                <View style={styles.grnmdlccanadguiidesavdcountbadge}>
                  <Text style={styles.grnmdlccanadguiidesavdcountbadgetext}>
                    {grnmdlccanadguiidesavdSavedLocations.length}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {grnmdlccanadguiidesavdEmpty ? (
            <View style={styles.grnmdlccanadguiidesavdemptywrap}>
              <View style={styles.grnmdlccanadguiidesavdavatarcircle}>
                <Image
                  source={require('../../assets/i/grnmdlccnosvd.png')}
                  style={styles.grnmdlccanadguiidesavdavatarimg}
                />
              </View>
              <Text style={styles.grnmdlccanadguiidesavdemptytitle}>
                No Saved Locations
              </Text>
              <Text style={styles.grnmdlccanadguiidesavdemptydesc}>
                Explore locations and tap the bookmark icon{'\n'}to save your
                favourites here.
              </Text>
              <Pressable
                onPress={() =>
                  grnmdlccanadguiidesavdNavigation.navigate(
                    'Grnmdlccanadguiideexplr' as never,
                  )
                }
                style={styles.grnmdlccanadguiidesavdexplorebtn}>
                <Text style={styles.grnmdlccanadguiidesavdexplorebtntext}>
                  Explore Locations
                </Text>
              </Pressable>
            </View>
          ) : (
            grnmdlccanadguiidesavdSavedLocations.map(item => {
              const grnmdlccanadguiidesavdCoord = `${grnmdlccanadguiidesavdFmtCoord(
                item.coordinates.lat,
                'N',
                'S',
              )}, ${grnmdlccanadguiidesavdFmtCoord(
                item.coordinates.lon,
                'E',
                'W',
              )}`;

              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    grnmdlccanadguiidesavdNavigation.navigate(
                      'Grnmdlccanadguiidelocdtl' as never,
                      {locationId: item.id} as never,
                    )
                  }
                  style={styles.grnmdlccanadguiidesavdlocationcard}>
                  <Image
                    source={item.image}
                    style={styles.grnmdlccanadguiidesavdlocationthumb}
                  />
                  <View style={styles.grnmdlccanadguiidesavdlocationtoprow}>
                    <View style={styles.grnmdlccanadguiidesavdlocationpill}>
                      <Text
                        style={styles.grnmdlccanadguiidesavdlocationpilltext}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grnmdlccanadguiidesavdlocationbody}>
                    <Text style={styles.grnmdlccanadguiidesavdlocationtitle}>
                      {item.title}
                    </Text>
                    <View
                      style={styles.grnmdlccanadguiidesavdlocationprovincerow}>
                      <Image
                        source={require('../../assets/i/grnmdlccanloc.png')}
                        style={styles.grnmdlccanadguiidesavdlocationpin}
                      />
                      <Text
                        style={styles.grnmdlccanadguiidesavdlocationprovince}>
                        {item.province}
                      </Text>
                    </View>
                    <Text style={styles.grnmdlccanadguiidesavdlocationcoord}>
                      {grnmdlccanadguiidesavdCoord}
                    </Text>
                  </View>
                  <View style={styles.grnmdlccanadguiidesavdactionswrap}>
                    <Image
                      source={require('../../assets/i/grnmdlccanaopn.png')}
                    />
                    <Pressable
                      accessibilityRole="button"
                      hitSlop={10}
                      onPress={() =>
                        grnmdlccanadguiidesavdHandleRemove(item.id)
                      }
                      style={styles.grnmdlccanadguiidesavddeletebtn}>
                      <Image
                        source={require('../../assets/i/grnmdlccadel.png')}
                        style={styles.grnmdlccanadguiidesavddeleteicon}
                      />
                    </Pressable>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    </Grnmdlccanadguiidlay>
  );
};

export default Grnmdlccanadguiidesavd;

const styles = StyleSheet.create({
  grnmdlccanadguiidesavdcountbadge: {
    backgroundColor: '#CCB50026',
    borderWidth: 1,
    borderColor: '#CCB5004D',
    borderRadius: 150,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grnmdlccanadguiidesavdcountbadgetext: {
    color: '#CCB500',
    fontSize: 13,
    fontWeight: '700',
  },

  grnmdlccanadguiidesavdroot: {flex: 1},

  grnmdlccanadguiidesavdlistcontent: {
    paddingTop: 60,
    paddingBottom: 120,
  },
  grnmdlccanadguiidesavdlistcontentempty: {
    flex: 1,
  },

  grnmdlccanadguiidesavdheaderpad: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  grnmdlccanadguiidesavdkicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiidesavdtitlerow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  grnmdlccanadguiidesavdh1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  grnmdlccanadguiidesavdemptywrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  grnmdlccanadguiidesavdavatarcircle: {
    marginBottom: 32,
  },
  grnmdlccanadguiidesavdavatarimg: {},
  grnmdlccanadguiidesavdemptytitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  grnmdlccanadguiidesavdemptydesc: {
    color: '#FFFFFF70',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  grnmdlccanadguiidesavdexplorebtn: {
    width: '93%',
    height: 55,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CCB50066',
    backgroundColor: '#CCB50026',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidesavdexplorebtntext: {
    color: '#CCB500',
    fontSize: 15,
    fontWeight: '600',
  },

  grnmdlccanadguiidesavdlocationcard: {
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
  grnmdlccanadguiidesavdlocationthumb: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF10',
  },
  grnmdlccanadguiidesavdlocationbody: {flex: 1, padding: 10},
  grnmdlccanadguiidesavdlocationtoprow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 0,
    bottom: 0,
  },
  grnmdlccanadguiidesavdlocationpill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#0000008C',
  },
  grnmdlccanadguiidesavdlocationpilltext: {
    color: '#CCB500',
    fontWeight: '700',
    fontSize: 10,
  },

  grnmdlccanadguiidesavdlocationtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  grnmdlccanadguiidesavdlocationprovincerow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  grnmdlccanadguiidesavdlocationpin: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  grnmdlccanadguiidesavdlocationprovince: {
    color: '#FFFFFF70',
    fontWeight: '500',
    fontSize: 10,
  },
  grnmdlccanadguiidesavdlocationcoord: {
    color: '#FFFFFF55',
    fontWeight: '500',
    marginTop: 8,
    fontSize: 10,
  },
  grnmdlccanadguiidesavdactionswrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 10,
  },
  grnmdlccanadguiidesavddeletebtn: {
    width: 32,
    height: 32,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#FF4D4D33',
    backgroundColor: '#B4282826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidesavddeleteicon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
