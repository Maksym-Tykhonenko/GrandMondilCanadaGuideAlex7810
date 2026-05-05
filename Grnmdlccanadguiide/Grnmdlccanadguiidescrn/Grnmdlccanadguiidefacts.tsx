import {useFocusEffect} from '@react-navigation/native';
import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';

import {grnmdlccanadguiideLocations} from '../Grnmdlccanadguiidedata/grnmdlccanadguiidelocations';

import React, {useCallback, useMemo, useState} from 'react';

import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';

type GrnmdlccanadguiidefactsCategory = 'Extreme' | 'Wildlife' | 'Mystery';

type GrnmdlccanadguiidefactsItem = {
  id: string;
  title: string;
  category: GrnmdlccanadguiidefactsCategory;
  description: string;
};

const grnmdlccanadguiidefactsCategoryMeta: Record<
  GrnmdlccanadguiidefactsCategory,
  {emoji: string; icon: string}
> = {
  Extreme: {
    emoji: '🧊',
    icon: '⚡',
  },
  Wildlife: {
    emoji: '🐾',
    icon: '🐾',
  },
  Mystery: {
    emoji: '🌌',
    icon: '🌀',
  },
};

const grnmdlccanadguiidefactsImagePoolAll = grnmdlccanadguiideLocations.map(
  l => l.image,
);
const grnmdlccanadguiidefactsImagePoolIce = grnmdlccanadguiideLocations
  .filter(l => l.category === 'Ice')
  .map(l => l.image);
const grnmdlccanadguiidefactsImagePoolWild = grnmdlccanadguiideLocations
  .filter(l => l.category === 'Wild')
  .map(l => l.image);
const grnmdlccanadguiidefactsImagePoolMystery = grnmdlccanadguiideLocations
  .filter(l => l.category === 'Sky' || l.category === 'Hidden')
  .map(l => l.image);

const grnmdlccanadguiidefactsHash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h * 31 + s.charCodeAt(i)) % 1000003;
  }
  return h;
};

const grnmdlccanadguiidefactsPickImage = (
  factId: string,
  category: GrnmdlccanadguiidefactsCategory,
) => {
  const pool =
    category === 'Extreme'
      ? grnmdlccanadguiidefactsImagePoolIce
      : category === 'Wildlife'
      ? grnmdlccanadguiidefactsImagePoolWild
      : grnmdlccanadguiidefactsImagePoolMystery;

  const safePool = pool.length ? pool : grnmdlccanadguiidefactsImagePoolAll;

  if (safePool.length === 0) {
    return require('../../assets/i/grnmdlccanaloc1.png');
  }
  const idx = grnmdlccanadguiidefactsHash(factId) % safePool.length;
  return safePool[idx];
};

const grnmdlccanadguiidefactsData: Record<
  GrnmdlccanadguiidefactsCategory,
  GrnmdlccanadguiidefactsItem[]
> = {
  Extreme: [
    {
      id: 'extreme-frozen-sound',
      title: 'Frozen Sound',
      category: 'Extreme',
      description:
        'In Canada, during severe frosts (below −20°C), the air becomes denser, and sound travels much faster and further. Because of this, people can hear conversations, footsteps, or even traffic at great distances. This creates a strange feeling of “acoustic silence”, where every sound seems closer than it actually is.',
    },
    {
      id: 'extreme-ice-roads',
      title: 'Ice Roads',
      category: 'Extreme',
      description:
        'In the remote northern regions of Canada, special ice roads form directly on frozen rivers and lakes in winter. They are so strong that they can withstand large trucks. These roads are vital, as they allow you to deliver food, fuel, and equipment to places that are almost impossible to reach in the summer.',
    },
    {
      id: 'extreme-breath-freezes',
      title: 'Breath Freezes',
      category: 'Extreme',
      description:
        'In extremely low temperatures, a person’s breath can instantly turn into ice crystals. Moisture in the air freezes right in front of your face, creating the effect of a sparkling fog. In such conditions, even hair and eyelashes can be covered with frost in a matter of minutes.',
    },
    {
      id: 'extreme-snow-desert',
      title: 'Snow Desert',
      category: 'Extreme',
      description:
        'In some regions of Canada, the snow is so dry and loose that it resembles desert sand. It does not stick together and practically does not hold its shape. Because of this, it is very difficult to make classic snowmen or snowballs there, which surprises tourists.',
    },
    {
      id: 'extreme-ice-cracks',
      title: 'Ice Cracks',
      category: 'Extreme',
      description:
        'Frozen lakes in Canada often “crack” due to temperature changes. The ice expands and contracts, creating loud sounds similar to explosions or impacts. This natural phenomenon can be scary, but is actually completely normal.',
    },
    {
      id: 'extreme-instant-frostbite',
      title: 'Instant Frostbite',
      category: 'Extreme',
      description:
        'In northern regions, frostbite can occur in just a few minutes without proper protection. Exposed skin loses heat very quickly, so locals wear multi-layered clothing even for short trips outside.',
    },
    {
      id: 'extreme-ice-fog',
      title: 'Ice Fog',
      category: 'Extreme',
      description:
        'At very low temperatures, “ice fog” can appear in cities. It is formed from microscopic ice crystals that hang in the air. Such fog looks thicker and more shiny than usual.',
    },
    {
      id: 'extreme-frozen-metal',
      title: 'Frozen Metal',
      category: 'Extreme',
      description:
        'Metal objects in severe frost can be dangerous - if you touch them with bare hands, the skin can literally “stick”. This is due to the instant freezing of moisture on the surface of the skin.',
    },
    {
      id: 'extreme-white-silence',
      title: 'White Silence',
      category: 'Extreme',
      description:
        'After a heavy snowfall, the effect of “white silence” appears. The snow absorbs sounds, and everything around becomes almost completely silent. This creates a very unusual and even a little unreal atmosphere.',
    },
    {
      id: 'extreme-frozen-waterfalls',
      title: 'Frozen Waterfalls',
      category: 'Extreme',
      description:
        'In winter, some waterfalls in Canada partially or completely freeze, turning into huge ice walls. Water sometimes continues to flow inside them, creating unique natural forms.',
    },
  ],
  Wildlife: [
    {
      id: 'wildlife-bear-cities',
      title: 'Bear Cities',
      category: 'Wildlife',
      description:
        'In some regions of Canada, especially in Churchill, polar bears can come right into the city. Because of this, there are even special “bear prisons” where they are temporarily kept to protect people.',
    },
    {
      id: 'wildlife-moose-giants',
      title: 'Moose Giants',
      category: 'Wildlife',
      description:
        'Canadian moose are one of the largest in the world. Their height can exceed 2 meters and weight - 600 kg. They can suddenly appear on the roads, which makes them dangerous for drivers.',
    },
    {
      id: 'wildlife-whale-routes',
      title: 'Whale Routes',
      category: 'Wildlife',
      description:
        'Whale migration routes run along the coast of Canada. Tourists can watch these huge animals rise from the water just a few dozen meters from boats.',
    },
    {
      id: 'wildlife-beaver-builders',
      title: 'Beaver Builders',
      category: 'Wildlife',
      description:
        'Beavers in Canada create complex systems of dams and canals. Their structures are so large that sometimes they are visible even from space.',
    },
    {
      id: 'wildlife-fox-colors',
      title: 'Fox Colors',
      category: 'Wildlife',
      description:
        'Arctic foxes change their fur color depending on the season. In winter, they turn completely white, and in summer, they turn darker to better camouflage themselves.',
    },
    {
      id: 'wildlife-wolf-howls',
      title: 'Wolf Howls',
      category: 'Wildlife',
      description:
        'Wolves in the Canadian forests use howls to communicate over long distances. They can be heard for many kilometers, especially at night.',
    },
    {
      id: 'wildlife-eagle-hunters',
      title: 'Eagle Hunters',
      category: 'Wildlife',
      description:
        'The bald eagles in Canada have incredibly sharp eyesight and can spot fish in the water from great heights. Their attacks seem very fast and precise.',
    },
    {
      id: 'wildlife-seal-ice-life',
      title: 'Seal Ice Life',
      category: 'Wildlife',
      description:
        'Seals often rest directly on the ice, creating breathing holes. They can stay near such holes for hours, avoiding predators.',
    },
    {
      id: 'wildlife-caribou-migration',
      title: 'Caribou Migration',
      category: 'Wildlife',
      description:
        'Caribou make some of the longest migrations of any land animal. They can travel thousands of kilometers in search of food.',
    },
    {
      id: 'wildlife-owl-silence',
      title: 'Owl Silence',
      category: 'Wildlife',
      description:
        'Owls in Canadian forests fly almost silently thanks to the special structure of their feathers. This allows them to sneak up on their prey unnoticed.',
    },
  ],
  Mystery: [
    {
      id: 'mystery-aurora-dance',
      title: 'Aurora Dance',
      category: 'Mystery',
      description:
        'The Northern Lights in Canada can change shape and color in seconds. They look like moving waves of light in the sky, which creates the feeling of a living phenomenon.',
    },
    {
      id: 'mystery-magnetic-zones',
      title: 'Magnetic Zones',
      category: 'Mystery',
      description:
        'In some areas of Canada, compasses can work unstable due to magnetic anomalies. This can disorient tourists without GPS.',
    },
    {
      id: 'mystery-singing-ice',
      title: 'Singing Ice',
      category: 'Mystery',
      description:
        'Strange sounds, similar to singing or humming, are sometimes heard on frozen lakes. This occurs due to the movement of ice and temperature changes.',
    },
    {
      id: 'mystery-endless-forests',
      title: 'Endless Forests',
      category: 'Mystery',
      description:
        'Canadian forests are so vast that you can travel in them for days without meeting people. This creates a feeling of complete isolation.',
    },
    {
      id: 'mystery-hidden-lakes',
      title: 'Hidden Lakes',
      category: 'Mystery',
      description:
        'In the mountains of Canada, there are lakes that are not visible from roads or popular routes. Some of them are discovered only by chance.',
    },
    {
      id: 'mystery-fog-valleys',
      title: 'Fog Valleys',
      category: 'Mystery',
      description:
        'In some valleys, fog can last all day, creating a mystical atmosphere. Visibility is often very limited there.',
    },
    {
      id: 'mystery-light-pillars',
      title: 'Light Pillars',
      category: 'Mystery',
      description:
        'In winter, in cold regions, you can see light pillars - vertical beams of light rising into the sky. They are caused by the reflection of light from ice crystals.',
    },
    {
      id: 'mystery-silent-nights',
      title: 'Silent Nights',
      category: 'Mystery',
      description:
        'In remote areas of Canada, the night is so quiet that you can hear your own breathing. This is a very unusual experience for city dwellers.',
    },
    {
      id: 'mystery-star-density',
      title: 'Star Density',
      category: 'Mystery',
      description:
        'Due to the lack of light pollution, the sky in Canada looks much brighter. You can see thousands of stars and even the structure of the Milky Way.',
    },
    {
      id: 'mystery-vanishing-trails',
      title: 'Vanishing Trails',
      category: 'Mystery',
      description:
        'In winter conditions, trails can completely disappear under the snow. This makes navigation difficult and adds an element of adventure.',
    },
  ],
};

const grnmdlccanadguiidefactsPickRandom = (
  items: GrnmdlccanadguiidefactsItem[],
) => {
  return items[Math.floor(Math.random() * items.length)];
};

const Grnmdlccanadguiidefacts = () => {
  const [grnmdlccanadguiidefactsActive, setGrnmdlccanadguiidefactsActive] =
    useState<GrnmdlccanadguiidefactsCategory>('Extreme');
  const [
    grnmdlccanadguiidefactsExpandedId,
    setGrnmdlccanadguiidefactsExpandedId,
  ] = useState<string | null>(null);

  const grnmdlccanadguiidefactsItems = useMemo(() => {
    return grnmdlccanadguiidefactsData[grnmdlccanadguiidefactsActive];
  }, [grnmdlccanadguiidefactsActive]);

  const grnmdlccanadguiidefactsHeaderLine = `${grnmdlccanadguiidefactsItems.length} facts`;

  useFocusEffect(
    useCallback(() => {
      setGrnmdlccanadguiidefactsActive('Extreme');
      setGrnmdlccanadguiidefactsExpandedId(null);
    }, []),
  );
  return (
    <Grnmdlccanadguiidlay>
      <View style={styles.grnmdlccanadguiidefactsroot}>
        <View style={styles.grnmdlccanadguiidefactsheaderpad}>
          <Text style={styles.grnmdlccanadguiidefactskicker}>KNOWLEDGE</Text>
          <View style={styles.grnmdlccanadguiidefactstitlerow}>
            <Text style={styles.grnmdlccanadguiidefactsh1}>Canada Facts</Text>
            <Pressable
              onPress={() => {
                const categories: GrnmdlccanadguiidefactsCategory[] = [
                  'Extreme',
                  'Wildlife',
                  'Mystery',
                ];
                const nextCat =
                  categories[Math.floor(Math.random() * categories.length)];
                const nextItem = grnmdlccanadguiidefactsPickRandom(
                  grnmdlccanadguiidefactsData[nextCat],
                );
                setGrnmdlccanadguiidefactsActive(nextCat);
                setGrnmdlccanadguiidefactsExpandedId(nextItem.id);
              }}
              style={styles.grnmdlccanadguiidefactsrandbtn}>
              <Image source={require('../../assets/i/grnmdlccncrand.png')} />
              <Text style={styles.grnmdlccanadguiidefactsrandbtntext}>
                Random
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.grnmdlccanadguiidefactscatrow}>
          {(['Extreme', 'Wildlife', 'Mystery'] as const).map(cat => {
            const active = cat === grnmdlccanadguiidefactsActive;
            return (
              <Pressable
                key={cat}
                onPress={() => {
                  setGrnmdlccanadguiidefactsActive(cat);
                  setGrnmdlccanadguiidefactsExpandedId(null);
                }}
                style={[
                  styles.grnmdlccanadguiidefactscatbtn,
                  active && styles.grnmdlccanadguiidefactscatbtnactive,
                ]}>
                <Text
                  style={[
                    styles.grnmdlccanadguiidefactscaticon,
                    active && styles.grnmdlccanadguiidefactscaticonactive,
                  ]}>
                  {grnmdlccanadguiidefactsCategoryMeta[cat].icon}
                </Text>
                <Text
                  style={[
                    styles.grnmdlccanadguiidefactscattext,
                    active && styles.grnmdlccanadguiidefactscattextactive,
                  ]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.grnmdlccanadguiidefactsline}>
          Jaw-dropping records & feats · {grnmdlccanadguiidefactsHeaderLine}
        </Text>

        <View style={styles.grnmdlccanadguiidefactslist}>
          {grnmdlccanadguiidefactsItems.map(item => {
            const expanded = item.id === grnmdlccanadguiidefactsExpandedId;
            const meta = grnmdlccanadguiidefactsCategoryMeta[item.category];
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  return;
                }}
                style={[
                  styles.grnmdlccanadguiidefactscard,
                  expanded && styles.grnmdlccanadguiidefactscardexpanded,
                ]}>
                <Image
                  source={grnmdlccanadguiidefactsPickImage(
                    item.id,
                    item.category,
                  )}
                  style={[
                    styles.grnmdlccanadguiidefactsimg,
                    expanded
                      ? styles.grnmdlccanadguiidefactsimgexpanded
                      : styles.grnmdlccanadguiidefactsimgcollapsed,
                  ]}
                />

                <View style={styles.grnmdlccanadguiidefactscardbody}>
                  <View style={styles.grnmdlccanadguiidefactstoprow}>
                    <View style={styles.grnmdlccanadguiidefactstag}>
                      <Text style={styles.grnmdlccanadguiidefactstagtext}>
                        {meta.icon} {item.category.toUpperCase()}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      hitSlop={30}
                      onPress={e => {
                        e.stopPropagation();
                        setGrnmdlccanadguiidefactsExpandedId(prev => {
                          if (prev === item.id) {
                            return null;
                          }
                          return item.id;
                        });
                      }}>
                      <Image
                        source={
                          !expanded
                            ? require('../../assets/i/grnmdlccncopn.png')
                            : require('../../assets/i/grnmdlccnclsss.png')
                        }
                      />
                    </Pressable>
                  </View>

                  <Text style={styles.grnmdlccanadguiidefactstitle}>
                    {item.title}
                  </Text>

                  {expanded ? (
                    <>
                      <Text style={styles.grnmdlccanadguiidefactsdesc}>
                        {item.description}
                      </Text>

                      <Pressable
                        onPress={async e => {
                          e.stopPropagation();
                          try {
                            await Share.share({
                              title: item.title,
                              message: `${meta.emoji} ${item.title}\n\n${item.description}`,
                            });
                          } catch {
                            console.log('error');
                          }
                        }}
                        style={styles.grnmdlccanadguiidefactssharebtn}>
                        <Image
                          source={require('../../assets/i/grnmdlccanshr.png')}
                          style={styles.grnmdlccanadguiidefactsshareicon}
                        />
                        <Text style={styles.grnmdlccanadguiidefactssharetext}>
                          Share This Fact
                        </Text>
                      </Pressable>
                    </>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Grnmdlccanadguiidlay>
  );
};

export default Grnmdlccanadguiidefacts;

const styles = StyleSheet.create({
  grnmdlccanadguiidefactsrandbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCB5001F',
    backgroundColor: '#CCB5001A',
    paddingHorizontal: 12,
    height: 34,

    justifyContent: 'center',
  },

  grnmdlccanadguiidefactsroot: {flex: 1},

  grnmdlccanadguiidefactsheaderpad: {paddingHorizontal: 20, paddingTop: 60},
  grnmdlccanadguiidefactskicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiidefactstitlerow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  grnmdlccanadguiidefactsh1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  grnmdlccanadguiidefactsrandbtntext: {
    color: '#CCB500',
    fontSize: 12,
    fontWeight: '700',
  },

  grnmdlccanadguiidefactscatrow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  grnmdlccanadguiidefactscatbtn: {
    flex: 1,
    height: 72,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1C80',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  grnmdlccanadguiidefactscatbtnactive: {
    borderColor: '#CCB50066',
    backgroundColor: '#CCB5001A',
  },
  grnmdlccanadguiidefactscaticon: {fontSize: 16, color: '#FFFFFF'},
  grnmdlccanadguiidefactscaticonactive: {color: '#fff'},
  grnmdlccanadguiidefactscattext: {
    color: '#FFFFFFC0',
    fontSize: 12,
    fontWeight: '700',
  },
  grnmdlccanadguiidefactscattextactive: {color: '#ffffff'},

  grnmdlccanadguiidefactsline: {
    color: '#FFFFFF50',
    marginTop: 12,
    fontWeight: '500',
    paddingHorizontal: 20,
    fontSize: 12,
  },

  grnmdlccanadguiidefactslist: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    marginTop: 12,
    gap: 12,
  },

  grnmdlccanadguiidefactscard: {
    backgroundColor: '#152B1CCC',
    borderColor: '#FFFFFF0F',
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 94,
  },
  grnmdlccanadguiidefactscardexpanded: {
    alignItems: 'flex-start',
  },
  grnmdlccanadguiidefactsimg: {width: 102, height: 72},
  grnmdlccanadguiidefactsimgexpanded: {height: 95},
  grnmdlccanadguiidefactsimgcollapsed: {height: '100%'},
  grnmdlccanadguiidefactscardbody: {flex: 1, padding: 12},
  grnmdlccanadguiidefactstoprow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  grnmdlccanadguiidefactstag: {
    backgroundColor: '#FFFFFF0F',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF10',
  },
  grnmdlccanadguiidefactstagtext: {
    color: '#FFFFFF80',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  grnmdlccanadguiidefactsarrow: {
    color: '#CCB500',
    fontSize: 18,
    fontWeight: '800',
  },
  grnmdlccanadguiidefactstitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  grnmdlccanadguiidefactsdesc: {
    color: '#FFFFFF85',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 10,
  },

  grnmdlccanadguiidefactssharebtn: {
    marginTop: 14,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CCB50066',
    backgroundColor: '#CCB5001A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  grnmdlccanadguiidefactsshareicon: {width: 16, height: 16},
  grnmdlccanadguiidefactssharetext: {
    color: '#CCB500',
    fontSize: 12,
    fontWeight: '700',
  },
});
