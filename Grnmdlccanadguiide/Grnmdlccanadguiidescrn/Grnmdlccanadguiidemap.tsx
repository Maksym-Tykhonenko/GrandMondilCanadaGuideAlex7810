import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';
import {
  grnmdlccanadguiideCategoryMeta,
  grnmdlccanadguiideExploreCategories,
  grnmdlccanadguiideLocations,
  type GrnmdlccanadguiideExploreCategory,
} from '../Grnmdlccanadguiidedata/grnmdlccanadguiidelocations';

import React, {useEffect, useMemo, useState} from 'react';

import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const grnmdlccanadguiidemapCategoryDot: Record<
  Exclude<GrnmdlccanadguiideExploreCategory, 'All'>,
  string
> = {
  Ice: '#4C86FF',
  Wild: '#4BE38E',
  Sky: '#B49BFF',
  Hidden: '#E6D04A',
  Stays: '#FFB27A',
};
const grnmdlccanadguiidemapPinBorderIdle = '#FFFFFF';
const grnmdlccanadguiidemapPinBorderSelected = '#FFFFFF';

const Grnmdlccanadguiidemap = () => {
  const grnmdlccanadguiidemapNavigation = useNavigation<any>();
  const grnmdlccanadguiidemapRoute = useRoute() as {
    params?: {locationId?: string};
  };
  const [grnmdlccanadguiidemapActive, setGrnmdlccanadguiidemapActive] =
    useState<GrnmdlccanadguiideExploreCategory>('All');
  const [grnmdlccanadguiidemapSelectedId, setGrnmdlccanadguiidemapSelectedId] =
    useState<string | null>(null);

  useEffect(() => {
    const grnmdlccanadguiidemapLocationId =
      grnmdlccanadguiidemapRoute.params?.locationId;
    if (!grnmdlccanadguiidemapLocationId) {
      return;
    }
    const grnmdlccanadguiidemapLoc = grnmdlccanadguiideLocations.find(
      x => x.id === grnmdlccanadguiidemapLocationId,
    );
    if (!grnmdlccanadguiidemapLoc) {
      return;
    }
    setGrnmdlccanadguiidemapActive(grnmdlccanadguiidemapLoc.category);
    setGrnmdlccanadguiidemapSelectedId(grnmdlccanadguiidemapLocationId);
  }, [grnmdlccanadguiidemapRoute.params?.locationId]);

  const grnmdlccanadguiidemapFiltered = useMemo(() => {
    if (grnmdlccanadguiidemapActive === 'All') {
      return grnmdlccanadguiideLocations;
    }
    return grnmdlccanadguiideLocations.filter(
      x => x.category === grnmdlccanadguiidemapActive,
    );
  }, [grnmdlccanadguiidemapActive]);

  const grnmdlccanadguiidemapSelected = useMemo(() => {
    if (!grnmdlccanadguiidemapSelectedId) {
      return null;
    }
    return grnmdlccanadguiideLocations.find(
      x => x.id === grnmdlccanadguiidemapSelectedId,
    );
  }, [grnmdlccanadguiidemapSelectedId]);

  const grnmdlccanadguiidemapShowGrid = !grnmdlccanadguiidemapSelected;

  return (
    <Grnmdlccanadguiidlay bounces={false}>
      <View style={styles.grnmdlccanadguiidemaproot}>
        <View style={styles.grnmdlccanadguiidemapheaderpad}>
          <Text style={styles.grnmdlccanadguiidemapkicker}>INTERACTIVE</Text>
          <Text style={styles.grnmdlccanadguiidemaph1}>Canada Map</Text>
        </View>

        <View style={styles.grnmdlccanadguiidemapchipsrow}>
          {grnmdlccanadguiideExploreCategories.map(cat => {
            const active = cat.id === grnmdlccanadguiidemapActive;
            return (
              <Pressable
                key={cat.id}
                onPress={() => {
                  setGrnmdlccanadguiidemapActive(cat.id);
                  setGrnmdlccanadguiidemapSelectedId(null);
                }}
                style={[
                  styles.grnmdlccanadguiidemapchip,
                  active && styles.grnmdlccanadguiidemapchipactive,
                ]}>
                <Text
                  style={[
                    styles.grnmdlccanadguiidemapchiptext,
                    active && styles.grnmdlccanadguiidemapchiptextactive,
                  ]}>
                  {cat.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.grnmdlccanadguiidemapcard}>
          <MapView
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            style={StyleSheet.absoluteFill}
            userInterfaceStyle="dark"
            initialRegion={{
              latitude: 56.1304,
              longitude: -106.3468,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}
            customMapStyle={
              Platform.OS === 'android'
                ? grnmdlccanadguiidemapMapStyle
                : undefined
            }
            onPress={e => {
              if (e?.nativeEvent?.action === 'marker-press') {
                return;
              }
              setGrnmdlccanadguiidemapSelectedId(null);
            }}>
            {grnmdlccanadguiidemapFiltered.map(loc => {
              const color = grnmdlccanadguiidemapCategoryDot[loc.category];
              const selected = loc.id === grnmdlccanadguiidemapSelectedId;
              return (
                <Marker
                  key={loc.id}
                  coordinate={{
                    latitude: loc.coordinates.lat,
                    longitude: loc.coordinates.lon,
                  }}
                  onPress={() => setGrnmdlccanadguiidemapSelectedId(loc.id)}>
                  <View
                    style={[
                      styles.grnmdlccanadguiidemappin,
                      {
                        backgroundColor: color,
                        borderColor: selected
                          ? grnmdlccanadguiidemapPinBorderSelected
                          : grnmdlccanadguiidemapPinBorderIdle,
                      },
                      selected && {width: 25, height: 25, borderRadius: 21},
                    ]}>
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 15,
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </View>

        <View style={styles.grnmdlccanadguiidemaplegendrow}>
          {(['Ice', 'Wild', 'Sky', 'Hidden', 'Stays'] as const).map(c => (
            <View key={c} style={styles.grnmdlccanadguiidemaplegenditem}>
              <View
                style={[
                  styles.grnmdlccanadguiidemaplegenddot,
                  {backgroundColor: grnmdlccanadguiidemapCategoryDot[c]},
                ]}
              />
              <Text style={styles.grnmdlccanadguiidemaplegendtext}>{c}</Text>
            </View>
          ))}
        </View>

        {grnmdlccanadguiidemapShowGrid ? (
          <>
            <Text style={styles.grnmdlccanadguiidemaphint}>
              Tap a pin to explore · {grnmdlccanadguiidemapFiltered.length}{' '}
              locations
            </Text>

            <View style={styles.grnmdlccanadguiidemapgrid}>
              {grnmdlccanadguiidemapFiltered.map(loc => (
                <Pressable
                  key={loc.id}
                  onPress={() =>
                    grnmdlccanadguiidemapNavigation.navigate(
                      'Grnmdlccanadguiidelocdtl' as never,
                      {locationId: loc.id} as never,
                    )
                  }
                  style={styles.grnmdlccanadguiidemapgridcard}>
                  <Image
                    source={loc.image}
                    style={styles.grnmdlccanadguiidemapgridimg}
                  />
                  <LinearGradient
                    colors={['#00000000', '#000000C0']}
                    style={styles.grnmdlccanadguiidemapgridfade}
                  />
                  <Text style={styles.grnmdlccanadguiidemapgridtitle}>
                    {loc.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : grnmdlccanadguiidemapSelected ? (
          <View style={styles.grnmdlccanadguiidemapselectedwrap}>
            <Pressable
              onPress={() =>
                grnmdlccanadguiidemapNavigation.navigate(
                  'Grnmdlccanadguiidelocdtl' as never,
                  {locationId: grnmdlccanadguiidemapSelected.id} as never,
                )
              }
              style={styles.grnmdlccanadguiidemapselectedcard}>
              <Image
                source={grnmdlccanadguiidemapSelected.image}
                style={styles.grnmdlccanadguiidemapselectedthumb}
              />

              <View style={styles.grnmdlccanadguiidemapselectedbody}>
                <Text style={styles.grnmdlccanadguiidemapselectedtitle}>
                  {grnmdlccanadguiidemapSelected.title}
                </Text>
                <View style={styles.grnmdlccanadguiidemapselectedsubrow}>
                  <Image source={require('../../assets/i/grnmdlccanloc.png')} />
                  <Text style={styles.grnmdlccanadguiidemapselectedsubtext}>
                    {grnmdlccanadguiidemapSelected.province}
                  </Text>
                </View>
                <Text style={styles.grnmdlccanadguiidemapselectedsmall}>
                  {
                    grnmdlccanadguiideCategoryMeta[
                      grnmdlccanadguiidemapSelected.category
                    ].emoji
                  }{' '}
                  {grnmdlccanadguiidemapSelected.category}
                </Text>
              </View>

              <Pressable
                onPress={e => {
                  e.stopPropagation();
                  grnmdlccanadguiidemapNavigation.navigate(
                    'Grnmdlccanadguiidelocdtl' as never,
                    {locationId: grnmdlccanadguiidemapSelected.id} as never,
                  );
                }}
                style={styles.grnmdlccanadguiidemapdetailsbtn}>
                <Text style={styles.grnmdlccanadguiidemapdetailsbtntext}>
                  Details
                </Text>
                <Text style={styles.grnmdlccanadguiidemapdetailsbtnchev}>
                  ›
                </Text>
              </Pressable>

              <Pressable
                onPress={e => {
                  e.stopPropagation();
                  setGrnmdlccanadguiidemapSelectedId(null);
                }}
                style={styles.grnmdlccanadguiidemapclosebtn}>
                <Image source={require('../../assets/i/grnmdlccnclss.png')} />
              </Pressable>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Grnmdlccanadguiidlay>
  );
};

export default Grnmdlccanadguiidemap;

const grnmdlccanadguiidemapMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#0E2416'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#9DB0A5'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#0E2416'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#1E3B2A'}],
  },
  {featureType: 'poi', stylers: [{visibility: 'off'}]},
  {featureType: 'road', stylers: [{visibility: 'off'}]},
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#0A1810'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#5E776B'}],
  },
];

const styles = StyleSheet.create({
  grnmdlccanadguiidemapgrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    paddingBottom: 14,
  },

  grnmdlccanadguiidemapgridcard: {
    width: '47%',
    height: 92,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1CCC',
  },

  grnmdlccanadguiidemaproot: {flex: 1, paddingBottom: 110},

  grnmdlccanadguiidemapheaderpad: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  grnmdlccanadguiidemapkicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiidemaph1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },

  grnmdlccanadguiidemapchipsrow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 18,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  grnmdlccanadguiidemapchip: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    backgroundColor: '#152B1C80',
  },
  grnmdlccanadguiidemapchipactive: {
    borderColor: '#CCB500',
    backgroundColor: '#CCB5001A',
  },
  grnmdlccanadguiidemapchiptext: {
    color: '#FFFFFF70',
    fontSize: 12,
    fontWeight: '600',
  },
  grnmdlccanadguiidemapchiptextactive: {color: '#CCB500'},

  grnmdlccanadguiidemapcard: {
    marginTop: 14,
    marginHorizontal: 20,
    height: 240,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CCB50026',
    overflow: 'hidden',
    position: 'relative',
  },

  grnmdlccanadguiidemappin: {
    width: 16,
    height: 16,
    borderRadius: 21,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grnmdlccanadguiidemaplegendrow: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 3,
  },
  grnmdlccanadguiidemaplegenditem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  grnmdlccanadguiidemaplegenddot: {width: 8, height: 8, borderRadius: 4},
  grnmdlccanadguiidemaplegendtext: {
    color: '#FFFFFF80',
    fontSize: 11,
    fontWeight: '500',
  },

  grnmdlccanadguiidemaphint: {
    color: '#FFFFFF50',
    marginTop: 12,
    fontWeight: '500',
    paddingHorizontal: 20,
    fontSize: 12,
  },

  grnmdlccanadguiidemapgridimg: {width: '100%', height: '100%'},
  grnmdlccanadguiidemapgridfade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
  },
  grnmdlccanadguiidemapgridtitle: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  grnmdlccanadguiidemapselectedwrap: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  grnmdlccanadguiidemapselectedcard: {
    backgroundColor: '#152B1CCC',
    borderColor: '#CCB50026',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
    minHeight: 94,
  },
  grnmdlccanadguiidemapselectedthumb: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  grnmdlccanadguiidemapselectedbody: {flex: 1, paddingVertical: 10},
  grnmdlccanadguiidemapselectedtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  grnmdlccanadguiidemapselectedsubrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  grnmdlccanadguiidemapselectedsubtext: {
    color: '#FFFFFF70',
    fontSize: 10,
    fontWeight: '500',
  },
  grnmdlccanadguiidemapselectedsmall: {
    color: '#FFFFFF55',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  grnmdlccanadguiidemapdetailsbtn: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCB50066',
    backgroundColor: '#CCB5001A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 2,
  },
  grnmdlccanadguiidemapdetailsbtntext: {
    color: '#CCB500',
    fontSize: 12,
    fontWeight: '700',
  },
  grnmdlccanadguiidemapdetailsbtnchev: {
    color: '#CCB500',
    fontSize: 16,
    fontWeight: '900',
    marginTop: -1,
  },
  grnmdlccanadguiidemapclosebtn: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    right: 4,
  },
  grnmdlccanadguiidemapclosebtntext: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
});
