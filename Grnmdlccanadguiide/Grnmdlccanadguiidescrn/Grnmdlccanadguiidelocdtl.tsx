import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';
import {
  grnmdlccanadguiideGetSavedIds,
  grnmdlccanadguiideToggleSavedId,
} from '../Grnmdlccanadguiideutil/grnmdlccanadguiidesaved';

import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type GrnmdlccanadguiidelocdtlCategory =
  | 'Ice'
  | 'Wild'
  | 'Sky'
  | 'Hidden'
  | 'Stays';

type GrnmdlccanadguiidelocdtlLocation = {
  id: string;
  title: string;
  category: GrnmdlccanadguiidelocdtlCategory;
  province: string;
  coordinates: {lat: number; lon: number};
  description: string;
  image: ImageSourcePropType;
};

const grnmdlccanadguiidelocdtlAllLocations: GrnmdlccanadguiidelocdtlLocation[] =
  [
    {
      id: 'ice-johnston-canyon',
      title: 'Ice Canyon Johnston',
      category: 'Ice',
      coordinates: {lat: 51.2436, lon: -115.8397},
      province: 'Alberta',
      image: require('../../assets/i/grnmdlccanaloc1.png'),
      description:
        'In winter, Johnston Canyon turns into a real ice world, where waterfalls completely or partially freeze, forming huge walls of ice and long transparent icicles. Wooden paths run right along the canyon, allowing you to feel close to the ice formations. The light passing through the ice creates bright blue and turquoise shades that look almost unreal. This place is especially popular among ice climbing and winter photography enthusiasts.',
    },
    {
      id: 'ice-abraham-lake',
      title: 'Abraham Frozen Lake',
      category: 'Ice',
      coordinates: {lat: 52.266, lon: -117.24},
      province: 'Alberta',
      image: require('../../assets/i/grnmdlccanaloc2.png'),
      description:
        'Abraham Lake is famous for a unique phenomenon - frozen methane bubbles that form under the transparent ice. In winter, the surface becomes so clear that you can see deep into the lake, where the bubbles seem frozen in time. On sunny days, this creates a fantastic effect, as if you are standing above another world. However, due to natural processes, the ice can be unstable, so this location is both beautiful and a little extreme.',
    },
    {
      id: 'ice-icefields-parkway',
      title: 'Icefields Parkway Glacier',
      category: 'Ice',
      coordinates: {lat: 52.22, lon: -117.225},
      province: 'Alberta',
      image: require('../../assets/i/grnmdlccanaloc3.png'),
      description:
        'The Icefields Parkway is not just a road, but a real journey through a glacial landscape. Along the route, you\u2019ll see views of huge glaciers that look like frozen waves. In winter, the area becomes even more rugged and isolated, with minimal tourists. Here you can see how ice has shaped mountains over millennia, and also experience the scale of Canada\u2019s wildlife.',
    },
    {
      id: 'ice-montmorency-falls',
      title: 'Montmorency Frozen Falls',
      category: 'Ice',
      coordinates: {lat: 46.89, lon: -71.147},
      province: 'Quebec',
      image: require('../../assets/i/grnmdlccanaloc4.png'),
      description:
        'Montmorency Falls is taller than Niagara Falls, and in winter it partially freezes, creating huge ice formations. At the foot of the falls, a so-called "ice cone" is formed, which looks like a mountain of snow and ice. Tourists can climb along special trails, feeling the power of the water that continues to flow under the ice. In the evening, the illumination makes this place even more magical.',
    },
    {
      id: 'ice-churchill-ice-coast',
      title: 'Churchill Ice Coast',
      category: 'Ice',
      coordinates: {lat: 58.7684, lon: -94.165},
      province: 'Manitoba',
      image: require('../../assets/i/grnmdlccanaloc5.png'),
      description:
        'The coast near Churchill turns into an endless icy expanse in winter. Hudson Bay freezes over, creating a thick layer of ice that looks like an Arctic desert. Here you can feel complete isolation from civilization, as well as see the harsh weather conditions of the north. It is in this region that polar bears are often seen, which makes the place even more unique and wild.',
    },
    {
      id: 'ice-iceberg-alley',
      title: 'Iceberg Alley',
      category: 'Ice',
      coordinates: {lat: 49.5, lon: -53.0},
      province: 'Newfoundland and Labrador',
      image: require('../../assets/i/grnmdlccanaloc6.png'),
      description:
        'Iceberg Alley is a coast along which giant icebergs, broken off from the glaciers of Greenland, float in the spring and early summer. Some of them are thousands of years old and are impressive in their size and shape. They can be bright blue or almost transparent, and sometimes even make cracking sounds as they melt. This is one of the few places in the world where you can see icebergs so close.',
    },
    {
      id: 'wild-churchill-polar-zone',
      title: 'Churchill Polar Zone',
      category: 'Wild',
      coordinates: {lat: 58.7684, lon: -94.165},
      province: 'Manitoba',
      image: require('../../assets/i/grnmdlccanaloc7.png'),
      description:
        'Churchill is considered one of the best places in the world to observe polar bears in the wild. In the fall, bears gather near the Hudson Bay coast in anticipation of the water freezing. Tourists are transported in special protected vehicles, which allows you to safely observe the animals from a very close distance. This place offers a rare opportunity to see one of the largest predators on the planet in its natural environment.',
    },
    {
      id: 'wild-great-bear-rainforest',
      title: 'Great Bear Rainforest',
      category: 'Wild',
      coordinates: {lat: 52.7, lon: -128.2},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc8.png'),
      description:
        'This unique coastal forest is home to the rare Kermode bear, which has white fur. The forest is so dense and wild that many parts of it remain virtually untouched by man. Here you can see bears, wolves, eagles and other species in their natural habitat. The atmosphere of the place combines the ocean, fog and dense vegetation, creating a feeling of complete isolation.',
    },
    {
      id: 'wild-algonquin-moose-trails',
      title: 'Algonquin Moose Trails',
      category: 'Wild',
      coordinates: {lat: 45.8372, lon: -78.379},
      province: 'Ontario',
      image: require('../../assets/i/grnmdlccanaloc9.png'),
      description:
        'Algonquin National Park is one of the best places to watch moose. They often come out to roads or water bodies, especially in the morning and evening. Moose look calm, but due to their size they can be dangerous, so it is important to keep your distance. In addition to them, you can meet beavers, deer and other animals here.',
    },
    {
      id: 'wild-pacific-whale-coast',
      title: 'Pacific Whale Coast',
      category: 'Wild',
      coordinates: {lat: 49.3, lon: -124.8},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc10.png'),
      description:
        "Canada's Pacific coast is one of the best places to watch whales. Here you can see killer whales, gray whales and humpback whales swimming very close to the boats. During the migration season, these giants make long journeys, and watching them becomes an unforgettable experience.",
    },
    {
      id: 'wild-jasper-wolf-valley',
      title: 'Jasper Wolf Valley',
      category: 'Wild',
      coordinates: {lat: 52.8737, lon: -118.0814},
      province: 'Alberta',
      image: require('../../assets/i/grnmdlccanaloc11.png'),
      description:
        'Jasper National Park is home to many predators, including wolves. In remote parts of the park, their howls can be heard, which are carried for long distances. This creates an atmosphere of wild and pristine nature. Bears, deer and other animals also live here, making the region one of the richest in wildlife.',
    },
    {
      id: 'wild-seal-river-wilderness',
      title: 'Seal River Wilderness',
      category: 'Wild',
      coordinates: {lat: 59.0, lon: -93.8},
      province: 'Manitoba',
      image: require('../../assets/i/grnmdlccanaloc12.png'),
      description:
        'This is one of the most remote and least populated areas of Canada, where nature remains almost untouched. Here you can see polar bears, caribou and arctic foxes in their natural habitat. Due to the lack of roads, it can only be reached by plane, making the trip a real expedition.',
    },
    {
      id: 'sky-yellowknife-aurora-field',
      title: 'Yellowknife Aurora Field',
      category: 'Sky',
      coordinates: {lat: 62.454, lon: -114.3718},
      province: 'Northwest Territories',
      image: require('../../assets/i/grnmdlccanaloc13.png'),
      description:
        'Yellowknife is considered one of the best places in the world to observe the northern lights. Thanks to the dry climate and minimal cloud cover, the sky here often remains clear. The aurora can appear in the form of green, purple and even red waves moving across the sky. Many tourists come here to see this natural phenomenon in its brightest form.',
    },
    {
      id: 'sky-jasper-dark-sky-preserve',
      title: 'Jasper Dark Sky Preserve',
      category: 'Sky',
      coordinates: {lat: 52.8737, lon: -118.0814},
      province: 'Alberta',
      image: require('../../assets/i/grnmdlccanaloc14.png'),
      description:
        'Jasper National Park is one of the largest dark sky preserves in the world. Due to the lack of light pollution, you can see thousands of stars, the Milky Way and even meteor showers. In the fall, the Dark Sky Festival is held, where night observations through telescopes are organized.',
    },
    {
      id: 'sky-churchill-aurora-coast',
      title: 'Churchill Aurora Coast',
      category: 'Sky',
      coordinates: {lat: 58.7684, lon: -94.165},
      province: 'Manitoba',
      image: require('../../assets/i/grnmdlccanaloc15.png'),
      description:
        'Churchill is known not only for its bears, but also for its fantastic conditions for observing the sky. In winter, you can see the northern lights here almost every day. The combination of the icy coast and light waves in the sky creates a very contrasting and unforgettable landscape.',
    },
    {
      id: 'sky-grasslands-star-field',
      title: 'Grasslands Star Field',
      category: 'Sky',
      coordinates: {lat: 49.2, lon: -107.7},
      province: 'Saskatchewan',
      image: require('../../assets/i/grnmdlccanaloc16.png'),
      description:
        'Grasslands National Park has one of the darkest sky horizons in Canada. There are no large cities here, so the sky looks unusually bright and deep. On cloudless nights, you can easily see the Milky Way with the naked eye, as well as watch shooting stars.',
    },
    {
      id: 'sky-mont-megantic-sky-reserve',
      title: 'Mont-M\u00e9gantic Sky Reserve',
      category: 'Sky',
      coordinates: {lat: 45.455, lon: -71.152},
      province: 'Quebec',
      image: require('../../assets/i/grnmdlccanaloc17.png'),
      description:
        'This is one of the world\u2019s first international dark sky reserves. It houses an observatory where you can learn more about the cosmos and observe the stars through powerful telescopes. The sky in this area is specially protected from light pollution.',
    },
    {
      id: 'sky-whitehorse-aurora-valley',
      title: 'Whitehorse Aurora Valley',
      category: 'Sky',
      coordinates: {lat: 60.7212, lon: -135.0568},
      province: 'Yukon',
      image: require('../../assets/i/grnmdlccanaloc18.png'),
      description:
        'Whitehorse is another popular place to see the northern lights. Thanks to the clean air and little artificial lighting, it offers a magnificent view of the night sky. Tourists often travel outside the city to see the aurora in the most natural conditions.',
    },
    {
      id: 'hidden-takakkaw-hidden-falls',
      title: 'Takakkaw Hidden Falls',
      category: 'Hidden',
      coordinates: {lat: 51.7217, lon: -116.4829},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc19.png'),
      description:
        'Takakkaw Falls is one of the highest in Canada, but due to its remoteness and difficult access, it remains less visited than popular tourist destinations. The water falls from a great height, creating a thick mist and a powerful noise. Surrounded by mountains and glaciers, this waterfall looks like a hidden corner of the wilderness, where only the most curious travelers reach.',
    },
    {
      id: 'hidden-spotted-lake-secret',
      title: 'Spotted Lake Secret',
      category: 'Hidden',
      coordinates: {lat: 49.082, lon: -119.567},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc20.png'),
      description:
        'Spotted Lake is one of the strangest lakes in Canada. In the summer, the water partially evaporates, and hundreds of rounded "spots" formed by minerals appear on the surface. Each of them has a different color - from yellow to blue. This place is considered sacred to indigenous peoples and looks like a natural anomaly.',
    },
    {
      id: 'hidden-hopewell-hidden-rocks',
      title: 'Hopewell Hidden Rocks',
      category: 'Hidden',
      coordinates: {lat: 45.821, lon: -64.576},
      province: 'New Brunswick',
      image: require('../../assets/i/grnmdlccanaloc21.png'),
      description:
        'Hopewell Rocks are huge rock formations formed by the tides of the Bay of Fundy. The peculiarity is that at low tide you can walk right on the ocean floor between the rocks, and after a few hours the water completely covers this area. This creates the effect of a "disappearing location".',
    },
    {
      id: 'hidden-haida-gwaii-lost-islands',
      title: 'Haida Gwaii Lost Islands',
      category: 'Hidden',
      coordinates: {lat: 53.25, lon: -132.0},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc22.png'),
      description:
        'The Haida Gwaii archipelago is often called the "lost islands" because of their isolation. The unique culture of the Haida people has been preserved here, and nature looks almost untouched. The fog, ocean and dense forests create an atmosphere of complete remoteness from the world.',
    },
    {
      id: 'hidden-pingualuit-crater-lake',
      title: 'Pingualuit Crater Lake',
      category: 'Hidden',
      coordinates: {lat: 61.283, lon: -73.676},
      province: 'Quebec',
      image: require('../../assets/i/grnmdlccanaloc23.png'),
      description:
        'This lake was formed in a meteorite crater and has an almost perfectly round shape. It is located far from settlements, which makes it little known among tourists. The water here is so clear that visibility reaches tens of meters.',
    },
    {
      id: 'hidden-little-limestone-blue-pools',
      title: 'Little Limestone Blue Pools',
      category: 'Hidden',
      coordinates: {lat: 56.82, lon: -99.53},
      province: 'Manitoba',
      image: require('../../assets/i/grnmdlccanaloc24.png'),
      description:
        'Little Limestone Lake is known for its ability to change the color of the water depending on the temperature. It can go from turquoise to a rich blue hue. Due to its remoteness, this place remains sparsely populated and looks like a hidden natural treasure.',
    },
    {
      id: 'stays-free-spirit-spheres',
      title: 'Free Spirit Spheres',
      category: 'Stays',
      coordinates: {lat: 49.308, lon: -124.739},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc25.png'),
      description:
        'These are unique suspended "spheres" located right in the middle of a dense forest on Vancouver Island. Each sphere is fixed between the trees and sways slightly, creating an unusual feeling of living in harmony with nature. Inside, the space is compact, but very cozy, and around is complete silence and the sounds of the forest. This is the perfect place for a digital detox and a complete disconnection from the city rhythm.',
    },
    {
      id: 'stays-hotel-de-glace',
      title: 'H\u00f4tel de Glace',
      category: 'Stays',
      coordinates: {lat: 46.997, lon: -71.295},
      province: 'Quebec',
      image: require('../../assets/i/grnmdlccanaloc26.png'),
      description:
        'This hotel is built entirely of snow and ice and operates only in winter. The rooms, furniture and even the decor are made of ice blocks, which gives the space a unique atmosphere. Guests sleep in special warm bags designed for low temperatures. The hotel\u2019s design changes every year, so each season looks new.',
    },
    {
      id: 'stays-clayoquot-wilderness-lodge',
      title: 'Clayoquot Wilderness Lodge',
      category: 'Stays',
      coordinates: {lat: 49.283, lon: -126.08},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc27.png'),
      description:
        'This is a luxury eco-resort located in a remote wilderness area. Instead of the usual buildings, large "safari tents" with comfortable conditions are used here. Guests can enjoy nature without harming the ecosystem, participating in kayaking, hiking and animal watching. The place is ideal for those who want to combine comfort and wildlife.',
    },
    {
      id: 'stays-fogo-island-inn',
      title: 'Fogo Island Inn',
      category: 'Stays',
      coordinates: {lat: 49.7165, lon: -54.1797},
      province: 'Newfoundland and Labrador',
      image: require('../../assets/i/grnmdlccanaloc28.png'),
      description:
        'This hotel looks like a modern architectural installation located on the edge of the ocean. It stands on stilts and seems to "float" above the rocky coast. The interior combines minimalism and local traditions, and the windows offer a panorama of the endless ocean. This place is created for those who are looking for silence, isolation and strong emotions from nature.',
    },
    {
      id: 'stays-arctic-treehouse-canada-style',
      title: 'Arctic TreeHouse Hotel (Canada style experience)',
      category: 'Stays',
      coordinates: {lat: 60.0, lon: -110.0},
      province: 'Northwest Territories',
      image: require('../../assets/i/grnmdlccanaloc29.png'),
      description:
        'Arctic treehouse-like complexes in Canada offer accommodation with large panoramic windows oriented to the sky. Guests can observe the northern lights right from their bed. Minimalist design and remote location create a feeling of complete isolation and immersion in the northern atmosphere.',
    },
    {
      id: 'stays-floating-cabins-lake',
      title: 'Floating Cabins Lake',
      category: 'Stays',
      coordinates: {lat: 50.1, lon: -122.95},
      province: 'British Columbia',
      image: require('../../assets/i/grnmdlccanaloc30.png'),
      description:
        'Floating cabins on Canadian lakes offer a unique experience of living right on the water. They slowly move with the waves, creating a sense of tranquility. In the morning you can wake up in the mist above the water, and in the evening - watch the sunset right from the terrace. This is the perfect place for those looking for an unconventional and relaxing vacation.',
    },
  ];

const grnmdlccanadguiidelocdtlCategoryMeta: Record<
  GrnmdlccanadguiidelocdtlCategory,
  {emoji: string; pill: string; headerGradient: [string, string]}
> = {
  Ice: {
    emoji: '\u2744\ufe0f',
    pill: '#2D5BFF',
    headerGradient: ['#295BFF50', '#295BFF00'],
  },
  Wild: {
    emoji: '\ud83d\udc3b',
    pill: '#39B36B',
    headerGradient: ['#39B36B45', '#39B36B00'],
  },
  Sky: {
    emoji: '\ud83c\udf0c',
    pill: '#8D66FF',
    headerGradient: ['#8D66FF45', '#8D66FF00'],
  },
  Hidden: {
    emoji: '\ud83c\udf32',
    pill: '#CCB500',
    headerGradient: ['#CCB50040', '#CCB50000'],
  },
  Stays: {
    emoji: '\ud83d\uded6',
    pill: '#FF8A3D',
    headerGradient: ['#FF8A3D40', '#FF8A3D00'],
  },
};

const grnmdlccanadguiidelocdtlFmtCoord = (
  v: number,
  pos: string,
  neg: string,
) => {
  const grnmdlccanadguiidelocdtlHemi = v >= 0 ? pos : neg;
  return `${Math.abs(v).toFixed(4)}\u00b0 ${grnmdlccanadguiidelocdtlHemi}`;
};

const Grnmdlccanadguiidelocdtl = () => {
  const grnmdlccanadguiidelocdtlNavigation = useNavigation();
  const grnmdlccanadguiidelocdtlRoute = useRoute() as {
    params?: {locationId?: string};
  };
  const [grnmdlccanadguiidelocdtlIsSaved, setGrnmdlccanadguiidelocdtlIsSaved] =
    useState(false);

  const grnmdlccanadguiidelocdtlLocationId =
    grnmdlccanadguiidelocdtlRoute.params?.locationId;

  const grnmdlccanadguiidelocdtlLocation = useMemo(() => {
    return grnmdlccanadguiidelocdtlAllLocations.find(
      x => x.id === grnmdlccanadguiidelocdtlLocationId,
    );
  }, [grnmdlccanadguiidelocdtlLocationId]);

  useFocusEffect(
    useCallback(() => {
      if (!grnmdlccanadguiidelocdtlLocationId) {
        setGrnmdlccanadguiidelocdtlIsSaved(false);
        return;
      }

      let grnmdlccanadguiidelocdtlMounted = true;
      grnmdlccanadguiideGetSavedIds().then(ids => {
        if (!grnmdlccanadguiidelocdtlMounted) {
          return;
        }
        setGrnmdlccanadguiidelocdtlIsSaved(
          ids.includes(grnmdlccanadguiidelocdtlLocationId),
        );
      });
      return () => {
        grnmdlccanadguiidelocdtlMounted = false;
      };
    }, [grnmdlccanadguiidelocdtlLocationId]),
  );

  const grnmdlccanadguiidelocdtlToggleSave = useCallback(async () => {
    if (!grnmdlccanadguiidelocdtlLocationId) {
      return;
    }
    const grnmdlccanadguiidelocdtlNext = await grnmdlccanadguiideToggleSavedId(
      grnmdlccanadguiidelocdtlLocationId,
    );
    setGrnmdlccanadguiidelocdtlIsSaved(grnmdlccanadguiidelocdtlNext.isSaved);
  }, [grnmdlccanadguiidelocdtlLocationId]);

  const grnmdlccanadguiidelocdtlShare = useCallback(async () => {
    if (!grnmdlccanadguiidelocdtlLocation) {
      return;
    }

    const grnmdlccanadguiidelocdtlCoordText = `${grnmdlccanadguiidelocdtlFmtCoord(
      grnmdlccanadguiidelocdtlLocation.coordinates.lat,
      'N',
      'S',
    )}, ${grnmdlccanadguiidelocdtlFmtCoord(
      grnmdlccanadguiidelocdtlLocation.coordinates.lon,
      'E',
      'W',
    )}`;

    const grnmdlccanadguiidelocdtlMessage = `${grnmdlccanadguiidelocdtlLocation.title}\n${grnmdlccanadguiidelocdtlLocation.province}, Canada\nCoordinates: ${grnmdlccanadguiidelocdtlCoordText}\n\n${grnmdlccanadguiidelocdtlLocation.description}`;

    try {
      await Share.share({
        title: grnmdlccanadguiidelocdtlLocation.title,
        message: grnmdlccanadguiidelocdtlMessage,
      });
    } catch {
      // ignore
    }
  }, [grnmdlccanadguiidelocdtlLocation]);

  if (!grnmdlccanadguiidelocdtlLocation) {
    return (
      <SafeAreaView style={styles.grnmdlccanadguiidelocdtlroot}>
        <View style={styles.grnmdlccanadguiidelocdtlpad}>
          <Pressable
            onPress={() => grnmdlccanadguiidelocdtlNavigation.goBack()}
            style={styles.grnmdlccanadguiidelocdtlbackbtn}>
            <Text style={styles.grnmdlccanadguiidelocdtlbacktext}>Back</Text>
          </Pressable>
          <Text style={styles.grnmdlccanadguiidelocdtltitle}>
            Location not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const grnmdlccanadguiidelocdtlMeta =
    grnmdlccanadguiidelocdtlCategoryMeta[
      grnmdlccanadguiidelocdtlLocation.category
    ];

  const grnmdlccanadguiidelocdtlCoordText = `${grnmdlccanadguiidelocdtlFmtCoord(
    grnmdlccanadguiidelocdtlLocation.coordinates.lat,
    'N',
    'S',
  )}, ${grnmdlccanadguiidelocdtlFmtCoord(
    grnmdlccanadguiidelocdtlLocation.coordinates.lon,
    'E',
    'W',
  )}`;

  return (
    <Grnmdlccanadguiidlay bounces={false}>
      <View style={styles.grnmdlccanadguiidelocdtlroot}>
        <View style={styles.grnmdlccanadguiidelocdtlheaderrow}>
          <Pressable
            onPress={() => grnmdlccanadguiidelocdtlNavigation.goBack()}
            style={styles.grnmdlccanadguiidelocdtlbackbtn}>
            <Image source={require('../../assets/i/grnmdlccanback.png')} />
            <Text style={styles.grnmdlccanadguiidelocdtlbacktext}>Back</Text>
          </Pressable>

          <View
            style={[
              styles.grnmdlccanadguiidelocdtlcategorypill,
              styles.grnmdlccanadguiidelocdtlcategorypillbg,
            ]}>
            <Text style={styles.grnmdlccanadguiidelocdtlcategorypilltext}>
              {grnmdlccanadguiidelocdtlMeta.emoji}{' '}
              {grnmdlccanadguiidelocdtlLocation.category}
            </Text>
          </View>
        </View>

        <View>
          <Image
            source={grnmdlccanadguiidelocdtlLocation.image}
            style={styles.grnmdlccanadguiidelocdtlhero}
          />
          <LinearGradient
            colors={['#00000000', 'rgb(9, 20, 14)']}
            style={styles.grnmdlccanadguiidelocdtlgradientoverlay}
          />
          <View style={styles.grnmdlccanadguiidelocdtlherotextwrap}>
            <Text style={styles.grnmdlccanadguiidelocdtltitle}>
              {grnmdlccanadguiidelocdtlLocation.title}
            </Text>
            <View style={styles.grnmdlccanadguiidelocdtlsubrow}>
              <Image source={require('../../assets/i/grnmdlccanloc.png')} />
              <Text style={styles.grnmdlccanadguiidelocdtlsubmuted}>
                {grnmdlccanadguiidelocdtlLocation.province}, Canada
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.grnmdlccanadguiidelocdtlcontentpad}>
          <View style={styles.grnmdlccanadguiidelocdtlinfocard}>
            <Image source={require('../../assets/i/grnmdlccansent.png')} />
            <View>
              <Text style={styles.grnmdlccanadguiidelocdtlinfolabel}>
                COORDINATES
              </Text>
              <Text style={styles.grnmdlccanadguiidelocdtlinfovalue}>
                {grnmdlccanadguiidelocdtlCoordText}
              </Text>
            </View>
          </View>

          <Text style={styles.grnmdlccanadguiidelocdtldesc}>
            {grnmdlccanadguiidelocdtlLocation.description}
          </Text>

          <View style={styles.grnmdlccanadguiidelocdtlactionsrow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                if (!grnmdlccanadguiidelocdtlLocationId) {
                  return;
                }
                (grnmdlccanadguiidelocdtlNavigation as any).navigate(
                  'Grnmdlccanadguiidetab',
                  {
                    screen: 'Grnmdlccanadguiidemap',
                    params: {locationId: grnmdlccanadguiidelocdtlLocationId},
                  },
                );
              }}
              style={[
                styles.grnmdlccanadguiidelocdtlactionbtn,
                styles.grnmdlccanadguiidelocdtlactionbtnprimary,
              ]}>
              <Image source={require('../../assets/i/grnmdlccanmap.png')} />
              <Text style={styles.grnmdlccanadguiidelocdtlactiontextprimary}>
                View on Map
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={grnmdlccanadguiidelocdtlToggleSave}
              style={styles.grnmdlccanadguiidelocdtlactionbtn}>
              <Image
                source={
                  grnmdlccanadguiidelocdtlIsSaved
                    ? require('../../assets/i/grnmdlccanlsaved.png')
                    : require('../../assets/i/grnmdlccansav.png')
                }
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={grnmdlccanadguiidelocdtlShare}
              style={styles.grnmdlccanadguiidelocdtlactionbtn}>
              <Image source={require('../../assets/i/grnmdlccanshr.png')} />
            </Pressable>
          </View>

          <View style={styles.grnmdlccanadguiidelocdtldivider} />

          <View style={styles.grnmdlccanadguiidelocdtlmetarow}>
            <View style={styles.grnmdlccanadguiidelocdtlmetachip}>
              <Text style={styles.grnmdlccanadguiidelocdtlmetachiplabel}>
                PROVINCE
              </Text>
              <Text style={styles.grnmdlccanadguiidelocdtlmetachipvalue}>
                {grnmdlccanadguiidelocdtlLocation.province}
              </Text>
            </View>
            <View style={styles.grnmdlccanadguiidelocdtlmetachip}>
              <Text style={styles.grnmdlccanadguiidelocdtlmetachiplabel}>
                CATEGORY
              </Text>
              <Text style={styles.grnmdlccanadguiidelocdtlmetachipvalue}>
                {grnmdlccanadguiidelocdtlMeta.emoji}{' '}
                {grnmdlccanadguiidelocdtlLocation.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Grnmdlccanadguiidlay>
  );
};

export default Grnmdlccanadguiidelocdtl;

const styles = StyleSheet.create({
  grnmdlccanadguiidelocdtlhero: {
    height: 290,
    marginBottom: 14,
    width: '100%',
  },
  grnmdlccanadguiidelocdtlgradientoverlay: {
    position: 'absolute',
    height: 220,
    bottom: 0,
    width: '100%',
  },

  grnmdlccanadguiidelocdtlroot: {paddingBottom: 30},
  grnmdlccanadguiidelocdtlpad: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  grnmdlccanadguiidelocdtlheaderrow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    paddingBottom: 12,
    zIndex: 1,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    width: '100%',
  },

  grnmdlccanadguiidelocdtlbackbtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 440,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#00000073',
  },
  grnmdlccanadguiidelocdtlbacktext: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },

  grnmdlccanadguiidelocdtlherotextwrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  grnmdlccanadguiidelocdtlcategorypill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  grnmdlccanadguiidelocdtlcategorypillbg: {
    backgroundColor: '#00000080',
    borderColor: '#CCB5004D',
  },
  grnmdlccanadguiidelocdtlcategorypilltext: {
    color: '#CCB500',
    fontWeight: '600',
    fontSize: 13,
  },

  grnmdlccanadguiidelocdtltitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 2,
  },
  grnmdlccanadguiidelocdtlsubrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  grnmdlccanadguiidelocdtlsubmuted: {
    color: '#FFFFFF85',
    fontSize: 12,
    fontWeight: '400',
  },

  grnmdlccanadguiidelocdtlcontentpad: {paddingHorizontal: 20},

  grnmdlccanadguiidelocdtlinfocard: {
    marginTop: 14,
    backgroundColor: '#152B1CCC',
    borderColor: '#CCB50026',
    borderWidth: 1,
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  grnmdlccanadguiidelocdtlinfolabel: {
    color: '#FFFFFF75',
    letterSpacing: 1.2,
    fontSize: 10,
    fontWeight: '600',
  },
  grnmdlccanadguiidelocdtlinfovalue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },

  grnmdlccanadguiidelocdtldesc: {
    color: '#FFFFFF90',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
    fontWeight: '400',
  },

  grnmdlccanadguiidelocdtlactionsrow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  grnmdlccanadguiidelocdtlactionbtn: {
    width: 47,
    height: 47,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#CCB50033',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#152B1CCC',
  },
  grnmdlccanadguiidelocdtlactionbtnprimary: {
    flex: 1,
    backgroundColor: '#152B1CCC',
    borderColor: '#CCB50033',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  grnmdlccanadguiidelocdtlactiontextprimary: {
    color: '#CCB500',
    fontWeight: '600',
    fontSize: 12,
  },

  grnmdlccanadguiidelocdtldivider: {
    height: 1,
    backgroundColor: '#8F8D8D',
    marginBottom: 15,
    marginTop: 30,
  },

  grnmdlccanadguiidelocdtlmetarow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  grnmdlccanadguiidelocdtlmetachip: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1C80',
    padding: 14,
  },
  grnmdlccanadguiidelocdtlmetachiplabel: {
    color: '#FFFFFF65',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  grnmdlccanadguiidelocdtlmetachipvalue: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
  },
});
