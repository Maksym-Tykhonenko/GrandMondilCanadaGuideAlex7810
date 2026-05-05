import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';

import RNFS from 'react-native-fs';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

type GrnmdlccanadguiidecollcWallpaper = {
  id: string;
  title: string;
  cost: number;
  image: ImageSourcePropType;
};

const grnmdlccanadguiidecollcMapleKey =
  'grnmdlccanadguiide:mapleLeavesBalance:v1';
const grnmdlccanadguiidecollcUnlockedKey =
  'grnmdlccanadguiide:wallpapersUnlocked:v1';
const grnmdlccanadguiidecollcDefaultLeaves = 10;

const grnmdlccanadguiidecollcWallpapers: GrnmdlccanadguiidecollcWallpaper[] = [
  {
    id: 'wp1',
    title: 'Autumn Forest',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall1.png'),
  },
  {
    id: 'wp2',
    title: 'Golden Trees',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall2.png'),
  },
  {
    id: 'wp3',
    title: 'Lake & Mountains',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall3.png'),
  },
  {
    id: 'wp4',
    title: 'City Lights',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall4.png'),
  },
  {
    id: 'wp5',
    title: 'Lilypads',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall5.png'),
  },
  {
    id: 'wp6',
    title: 'Black & White Coast',
    cost: 3,
    image: require('../../assets/i/grnmdlccncwall6.png'),
  },
];

const grnmdlccanadguiidecollcParseIntSafe = (raw: string | null) => {
  if (!raw) {
    return null;
  }
  const v = Number(raw);
  if (!Number.isFinite(v)) {
    return null;
  }
  return Math.max(0, Math.floor(v));
};

const grnmdlccanadguiidecollcLoadUnlocked = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(grnmdlccanadguiidecollcUnlockedKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(x => typeof x === 'string');
  } catch {
    return [];
  }
};

const grnmdlccanadguiidecollcSaveUnlocked = async (ids: string[]) => {
  try {
    await AsyncStorage.setItem(
      grnmdlccanadguiidecollcUnlockedKey,
      JSON.stringify(ids),
    );
  } catch {
    console.log('error');
  }
};

export default function Grnmdlccanadguiidecollc() {
  const [grnmdlccanadguiidecollcLeaves, setGrnmdlccanadguiidecollcLeaves] =
    useState<number>(grnmdlccanadguiidecollcDefaultLeaves);
  const [grnmdlccanadguiidecollcUnlocked, setGrnmdlccanadguiidecollcUnlocked] =
    useState<string[]>([]);
  const [grnmdlccanadguiidecollcShakeId, setGrnmdlccanadguiidecollcShakeId] =
    useState<string | null>(null);
  const grnmdlccanadguiidecollcShakeX = useRef(new Animated.Value(0)).current;

  const grnmdlccanadguiidecollcImageRefs = useRef<Record<string, any>>({});

  const grnmdlccanadguiidecollcDoShake = useCallback(
    (wpId: string) => {
      setGrnmdlccanadguiidecollcShakeId(wpId);
      grnmdlccanadguiidecollcShakeX.setValue(0);

      Animated.sequence([
        Animated.timing(grnmdlccanadguiidecollcShakeX, {
          toValue: -6,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(grnmdlccanadguiidecollcShakeX, {
          toValue: 6,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(grnmdlccanadguiidecollcShakeX, {
          toValue: -4,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(grnmdlccanadguiidecollcShakeX, {
          toValue: 4,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(grnmdlccanadguiidecollcShakeX, {
          toValue: 0,
          duration: 45,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          setGrnmdlccanadguiidecollcShakeId(null);
        }
      });
    },
    [grnmdlccanadguiidecollcShakeX],
  );

  const grnmdlccanadguiidecollcSyncFromStorage = useCallback(async () => {
    const rawLeaves = await AsyncStorage.getItem(grnmdlccanadguiidecollcMapleKey);
    const parsedLeaves = grnmdlccanadguiidecollcParseIntSafe(rawLeaves);
    const nextLeaves =
      parsedLeaves === null ? grnmdlccanadguiidecollcDefaultLeaves : parsedLeaves;

    setGrnmdlccanadguiidecollcLeaves(nextLeaves);
    if (parsedLeaves === null) {
      await AsyncStorage.setItem(grnmdlccanadguiidecollcMapleKey, String(nextLeaves));
    }

    const unlockedIds = await grnmdlccanadguiidecollcLoadUnlocked();
    setGrnmdlccanadguiidecollcUnlocked(unlockedIds);
  }, []);

  useEffect(() => {
    grnmdlccanadguiidecollcSyncFromStorage();
  }, [grnmdlccanadguiidecollcSyncFromStorage]);

  useFocusEffect(
    useCallback(() => {
      grnmdlccanadguiidecollcSyncFromStorage();
    }, [grnmdlccanadguiidecollcSyncFromStorage]),
  );

  const grnmdlccanadguiidecollcUnlockedCount =
    grnmdlccanadguiidecollcUnlocked.length;

  const grnmdlccanadguiidecollcTryUnlock = useCallback(
    async (wp: GrnmdlccanadguiidecollcWallpaper) => {
      if (grnmdlccanadguiidecollcUnlocked.includes(wp.id)) {
        return;
      }
      if (grnmdlccanadguiidecollcLeaves < wp.cost) {
        grnmdlccanadguiidecollcDoShake(wp.id);
        return;
      }

      const nextLeaves = grnmdlccanadguiidecollcLeaves - wp.cost;
      const nextUnlocked = [...grnmdlccanadguiidecollcUnlocked, wp.id];

      setGrnmdlccanadguiidecollcLeaves(nextLeaves);
      setGrnmdlccanadguiidecollcUnlocked(nextUnlocked);

      await AsyncStorage.setItem(
        grnmdlccanadguiidecollcMapleKey,
        String(nextLeaves),
      );
      await grnmdlccanadguiidecollcSaveUnlocked(nextUnlocked);
    },
    [
      grnmdlccanadguiidecollcDoShake,
      grnmdlccanadguiidecollcLeaves,
      grnmdlccanadguiidecollcUnlocked,
    ],
  );

  const grnmdlccanadguiidecollcShare = async (wpId: string) => {
    try {
      const grnmdlccanadguiidecollcTargetRef =
        grnmdlccanadguiidecollcImageRefs.current[wpId];
      if (!grnmdlccanadguiidecollcTargetRef) {
        return;
      }

      const grnmdlccanadguiidecollcTmpUri = await captureRef(
        grnmdlccanadguiidecollcTargetRef,
        {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
        },
      );

      const grnmdlccanadguiidecollcFileUri =
        grnmdlccanadguiidecollcTmpUri.startsWith('file://')
          ? grnmdlccanadguiidecollcTmpUri
          : `file://${grnmdlccanadguiidecollcTmpUri}`;

      const grnmdlccanadguiidecollcPathToCheck =
        grnmdlccanadguiidecollcFileUri.replace('file://', '');
      const grnmdlccanadguiidecollcExists = await RNFS.exists(
        grnmdlccanadguiidecollcPathToCheck,
      );

      if (!grnmdlccanadguiidecollcExists) {
        return;
      }

      await Share.open({
        url: grnmdlccanadguiidecollcFileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (grnmdlccanadguiidecollcError: unknown) {
      if (
        grnmdlccanadguiidecollcError instanceof Error &&
        !grnmdlccanadguiidecollcError.message?.includes('User did not share')
      ) {
        console.error('error', grnmdlccanadguiidecollcError);
      }
    }
  };

  const grnmdlccanadguiidecollcUnlockedSet = useMemo(() => {
    return new Set(grnmdlccanadguiidecollcUnlocked);
  }, [grnmdlccanadguiidecollcUnlocked]);

  return (
    <Grnmdlccanadguiidlay>
      <View style={styles.grnmdlccanadguiidecollcroot}>
        <View style={styles.grnmdlccanadguiidecollcheader}>
          <View>
            <Text style={styles.grnmdlccanadguiidecollckicker}>
              MAPLE STORE
            </Text>
            <Text style={styles.grnmdlccanadguiidecollctitle}>Wallpapers</Text>
          </View>
          <Text style={styles.grnmdlccanadguiidecollccount}>
            {grnmdlccanadguiidecollcUnlockedCount}/
            {grnmdlccanadguiidecollcWallpapers.length} unlocked
          </Text>
        </View>

        <View style={styles.grnmdlccanadguiidecollcbanner}>
          <Text style={styles.grnmdlccanadguiidecollcbannericon}>🍁</Text>
          <View style={styles.grnmdlccanadguiidecollcbannerbody}>
            <Text style={styles.grnmdlccanadguiidecollcbannertop}>
              {grnmdlccanadguiidecollcLeaves} Maple Leaves
            </Text>
            <Text style={styles.grnmdlccanadguiidecollcbannerbot}>
              Earn more by completing the quiz
            </Text>
          </View>
        </View>

        <View style={styles.grnmdlccanadguiidecollcgrid}>
          {grnmdlccanadguiidecollcWallpapers.map(wp => {
            const isUnlocked = grnmdlccanadguiidecollcUnlockedSet.has(wp.id);
            const canBuy = grnmdlccanadguiidecollcLeaves >= wp.cost;

            return (
              <View key={wp.id} style={styles.grnmdlccanadguiidecollccardwrap}>
                <Pressable
                  onPress={() => {
                    if (!isUnlocked) {
                      grnmdlccanadguiidecollcTryUnlock(wp);
                    }
                  }}
                  style={styles.grnmdlccanadguiidecollccard}>
                  <View
                    collapsable={false}
                    ref={(r: any) => {
                      if (r) {
                        grnmdlccanadguiidecollcImageRefs.current[wp.id] = r;
                      }
                    }}
                    style={styles.grnmdlccanadguiidecollcfull}>
                    <Image source={wp.image} style={styles.grnmdlccanadguiidecollcfull} />
                  </View>
                  <View style={styles.grnmdlccanadguiidecollcimgplaceholder}>
                    <Text
                      style={styles.grnmdlccanadguiidecollcplaceholderemoji}>
                      🍁
                    </Text>
                  </View>

                  {!isUnlocked ? (
                    <View style={styles.grnmdlccanadguiidecollclockoverlay}>
                      <View style={styles.grnmdlccanadguiidecollclockbubble}>
                        <Image
                          source={require('../../assets/i/grnmdlccncwlock.png')}
                        />
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.grnmdlccanadguiidecollcpillrow}>
                    {isUnlocked ? (
                      <View style={styles.grnmdlccanadguiidecollcactions}>
                        <TouchableOpacity
                          style={styles.grnmdlccanadguiidecollcactionbtn}
                          onPress={() => grnmdlccanadguiidecollcShare(wp.id)}>
                          <Image
                            source={require('../../assets/i/grnmdlccncwshr.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Animated.View
                        style={[
                          styles.grnmdlccanadguiidecollccostpill,
                          !canBuy && styles.grnmdlccanadguiidecollccostpilldim,
                          {
                            transform: [
                              {
                                translateX:
                                  grnmdlccanadguiidecollcShakeId === wp.id
                                    ? grnmdlccanadguiidecollcShakeX
                                    : 0,
                              },
                            ],
                          },
                        ]}>
                        <Text style={styles.grnmdlccanadguiidecollccosttxt}>
                          🍁 {wp.cost}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </Grnmdlccanadguiidlay>
  );
}

const styles = StyleSheet.create({
  grnmdlccanadguiidecollcbannertop: {
    color: '#CCB500',
    fontSize: 15,
    fontWeight: '700',
  },

  grnmdlccanadguiidecollcroot: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  grnmdlccanadguiidecollcheader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  grnmdlccanadguiidecollckicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiidecollctitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
  grnmdlccanadguiidecollccount: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '400',
  },

  grnmdlccanadguiidecollcbanner: {
    marginTop: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CCB50033',
    backgroundColor: '#CCB50014',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 63,
  },
  grnmdlccanadguiidecollcbannericon: {fontSize: 18},
  grnmdlccanadguiidecollcbannerbody: {flex: 1},

  grnmdlccanadguiidecollcbannerbot: {
    marginTop: 4,
    color: '#FFFFFF70',
    fontSize: 12,
    fontWeight: '400',
  },

  grnmdlccanadguiidecollcgrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  grnmdlccanadguiidecollccardwrap: {width: '48%'},
  grnmdlccanadguiidecollccard: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1CCC',
    overflow: 'hidden',
    height: 192,
  },
  grnmdlccanadguiidecollcimgplaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidecollcplaceholderemoji: {fontSize: 34, opacity: 0.5},
  grnmdlccanadguiidecollclockoverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grnmdlccanadguiidecollclockicon: {
    fontSize: 26,
    padding: 18,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#00000066',
    color: '#FFFFFF',
  },

  grnmdlccanadguiidecollcpillrow: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },

  grnmdlccanadguiidecollccostpill: {
    minWidth: 78,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#CCB500B2',
    borderWidth: 1,
    borderColor: '#CCB500',
  },
  grnmdlccanadguiidecollccostpilldim: {
    opacity: 0.45,
  },

  grnmdlccanadguiidecollccosttxt: {
    color: '#0A1810',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },

  grnmdlccanadguiidecollcactions: {flexDirection: 'row', gap: 12},
  grnmdlccanadguiidecollcactionbtn: {
    minWidth: 78,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 24,
    backgroundColor: '#CCB500B2',
    borderWidth: 1,
    borderColor: '#CCB500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidecollcactiontxt: {
    color: '#0A1810',
    fontSize: 16,
    fontWeight: '900',
    marginTop: -1,
  },

  grnmdlccanadguiidecollcfull: {width: '100%', height: '100%'},

  grnmdlccanadguiidecollclockbubble: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    borderRadius: 102,
  },
});
