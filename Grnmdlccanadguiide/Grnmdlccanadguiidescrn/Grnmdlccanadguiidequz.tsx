import Grnmdlccanadguiidlay from '../Grnmdlccanadguiidecpn/Grnmdlccanadguiidlay';
import {useFocusEffect} from '@react-navigation/native';

import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

type GrnmdlccanadguiidequzOptionId = 'A' | 'B' | 'C' | 'D';
type GrnmdlccanadguiidequzStage = 'intro' | 'question' | 'result';

type GrnmdlccanadguiidequzQuestion = {
  id: string;
  prompt: string;
  options: Array<{id: GrnmdlccanadguiidequzOptionId; text: string}>;
  correctOptionId: GrnmdlccanadguiidequzOptionId;
};

const grnmdlccanadguiidequzMapleKey =
  'grnmdlccanadguiide:mapleLeavesBalance:v1';

const grnmdlccanadguiidequzTotalQuestions = 5;
const grnmdlccanadguiidequzLeavesPerCorrect = 2;

const grnmdlccanadguiidequzAllQuestions: GrnmdlccanadguiidequzQuestion[] = [
  {
    id: 'q1',
    prompt: 'Canada is home to more lakes than the rest of the world ______.',
    options: [
      {id: 'A', text: 'combined'},
      {id: 'B', text: 'divided'},
      {id: 'C', text: 'compared'},
      {id: 'D', text: 'collected'},
    ],
    correctOptionId: 'A',
  },
  {
    id: 'q2',
    prompt: 'The capital city of Canada is ______.',
    options: [
      {id: 'A', text: 'Toronto'},
      {id: 'B', text: 'Vancouver'},
      {id: 'C', text: 'Ottawa'},
      {id: 'D', text: 'Montreal'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q3',
    prompt:
      'The famous Niagara Falls are located on the border between Canada and ______.',
    options: [
      {id: 'A', text: 'Mexico'},
      {id: 'B', text: 'USA'},
      {id: 'C', text: 'Greenland'},
      {id: 'D', text: 'Iceland'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q4',
    prompt: 'The national animal of Canada is the ______.',
    options: [
      {id: 'A', text: 'Bear'},
      {id: 'B', text: 'Moose'},
      {id: 'C', text: 'Beaver'},
      {id: 'D', text: 'Wolf'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q5',
    prompt:
      'Canada is known for extremely cold winters, especially in the ______ regions.',
    options: [
      {id: 'A', text: 'southern'},
      {id: 'B', text: 'eastern'},
      {id: 'C', text: 'northern'},
      {id: 'D', text: 'coastal'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q6',
    prompt: 'The Northern Lights are also known as ______.',
    options: [
      {id: 'A', text: 'Solar Waves'},
      {id: 'B', text: 'Aurora Borealis'},
      {id: 'C', text: 'Sky Fire'},
      {id: 'D', text: 'Polar Glow'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q7',
    prompt: 'Canada produces a large amount of ______ syrup.',
    options: [
      {id: 'A', text: 'apple'},
      {id: 'B', text: 'maple'},
      {id: 'C', text: 'cherry'},
      {id: 'D', text: 'pine'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q8',
    prompt: 'The Rocky Mountains are located in ______ Canada.',
    options: [
      {id: 'A', text: 'eastern'},
      {id: 'B', text: 'western'},
      {id: 'C', text: 'northern'},
      {id: 'D', text: 'central'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q9',
    prompt: 'The longest coastline in the world belongs to ______.',
    options: [
      {id: 'A', text: 'Russia'},
      {id: 'B', text: 'Australia'},
      {id: 'C', text: 'Canada'},
      {id: 'D', text: 'USA'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q10',
    prompt: 'A famous Canadian wildlife animal is the ______ bear.',
    options: [
      {id: 'A', text: 'brown'},
      {id: 'B', text: 'panda'},
      {id: 'C', text: 'polar'},
      {id: 'D', text: 'black'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q11',
    prompt: 'The official languages of Canada are English and ______.',
    options: [
      {id: 'A', text: 'Spanish'},
      {id: 'B', text: 'German'},
      {id: 'C', text: 'French'},
      {id: 'D', text: 'Italian'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q12',
    prompt: 'Canada is the ______ largest country in the world.',
    options: [
      {id: 'A', text: 'first'},
      {id: 'B', text: 'second'},
      {id: 'C', text: 'third'},
      {id: 'D', text: 'fourth'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q13',
    prompt: 'The province of Quebec is mainly ______ speaking.',
    options: [
      {id: 'A', text: 'English'},
      {id: 'B', text: 'French'},
      {id: 'C', text: 'Spanish'},
      {id: 'D', text: 'Italian'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q14',
    prompt: 'The famous CN Tower is located in ______.',
    options: [
      {id: 'A', text: 'Ottawa'},
      {id: 'B', text: 'Toronto'},
      {id: 'C', text: 'Calgary'},
      {id: 'D', text: 'Edmonton'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q15',
    prompt:
      'Many remote Canadian areas are only accessible by ______ in winter.',
    options: [
      {id: 'A', text: 'boats'},
      {id: 'B', text: 'planes'},
      {id: 'C', text: 'ice roads'},
      {id: 'D', text: 'trains'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q16',
    prompt:
      'Canada has one of the largest forests in the world called the ______ forest.',
    options: [
      {id: 'A', text: 'tropical'},
      {id: 'B', text: 'boreal'},
      {id: 'C', text: 'desert'},
      {id: 'D', text: 'mountain'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q17',
    prompt: 'A common winter sport in Canada is ______.',
    options: [
      {id: 'A', text: 'surfing'},
      {id: 'B', text: 'skiing'},
      {id: 'C', text: 'climbing'},
      {id: 'D', text: 'cycling'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q18',
    prompt: 'The Arctic region of Canada is covered mostly by ______.',
    options: [
      {id: 'A', text: 'sand'},
      {id: 'B', text: 'grass'},
      {id: 'C', text: 'ice'},
      {id: 'D', text: 'rock'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q19',
    prompt: 'A famous Canadian city known for festivals is ______.',
    options: [
      {id: 'A', text: 'Montreal'},
      {id: 'B', text: 'Winnipeg'},
      {id: 'C', text: 'Halifax'},
      {id: 'D', text: 'Regina'},
    ],
    correctOptionId: 'A',
  },
  {
    id: 'q20',
    prompt: 'In Canada, people use maple leaves as a national ______.',
    options: [
      {id: 'A', text: 'animal'},
      {id: 'B', text: 'symbol'},
      {id: 'C', text: 'food'},
      {id: 'D', text: 'building'},
    ],
    correctOptionId: 'B',
  },
];

const grnmdlccanadguiidequzShuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const grnmdlccanadguiidequzLoadBalance = async () => {
  try {
    const raw = await AsyncStorage.getItem(grnmdlccanadguiidequzMapleKey);
    const v = raw ? Number(raw) : 0;
    return Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0;
  } catch {
    return 0;
  }
};

const grnmdlccanadguiidequzSaveBalance = async (v: number) => {
  try {
    await AsyncStorage.setItem(grnmdlccanadguiidequzMapleKey, String(v));
  } catch {
    // ignore
  }
};

export default function Grnmdlccanadguiidequz() {
  const [grnmdlccanadguiidequzStage, setGrnmdlccanadguiidequzStage] =
    useState<GrnmdlccanadguiidequzStage>('intro');
  const [grnmdlccanadguiidequzBalance, setGrnmdlccanadguiidequzBalance] =
    useState(0);
  const [grnmdlccanadguiidequzRun, setGrnmdlccanadguiidequzRun] = useState<
    GrnmdlccanadguiidequzQuestion[]
  >([]);
  const [grnmdlccanadguiidequzIdx, setGrnmdlccanadguiidequzIdx] = useState(0);
  const [
    grnmdlccanadguiidequzSelectedOption,
    setGrnmdlccanadguiidequzSelectedOption,
  ] = useState<GrnmdlccanadguiidequzOptionId | null>(null);
  const [
    grnmdlccanadguiidequzAnsweredCorrect,
    setGrnmdlccanadguiidequzAnsweredCorrect,
  ] = useState<boolean | null>(null);
  const [
    grnmdlccanadguiidequzCorrectCount,
    setGrnmdlccanadguiidequzCorrectCount,
  ] = useState(0);
  const [grnmdlccanadguiidequzEarned, setGrnmdlccanadguiidequzEarned] =
    useState(0);

  useEffect(() => {
    grnmdlccanadguiidequzLoadBalance().then(setGrnmdlccanadguiidequzBalance);
  }, []);

  useFocusEffect(useCallback(() => {}, []));

  const grnmdlccanadguiidequzCurrent =
    grnmdlccanadguiidequzRun[grnmdlccanadguiidequzIdx];

  const grnmdlccanadguiidequzProgress = useMemo(() => {
    if (grnmdlccanadguiidequzStage !== 'question') {
      return 0;
    }
    return (grnmdlccanadguiidequzIdx + 1) / grnmdlccanadguiidequzTotalQuestions;
  }, [grnmdlccanadguiidequzIdx, grnmdlccanadguiidequzStage]);

  const grnmdlccanadguiidequzStart = useCallback(() => {
    const nextRun = grnmdlccanadguiidequzShuffle(
      grnmdlccanadguiidequzAllQuestions,
    ).slice(0, grnmdlccanadguiidequzTotalQuestions);
    setGrnmdlccanadguiidequzRun(nextRun);
    setGrnmdlccanadguiidequzIdx(0);
    setGrnmdlccanadguiidequzSelectedOption(null);
    setGrnmdlccanadguiidequzAnsweredCorrect(null);
    setGrnmdlccanadguiidequzCorrectCount(0);
    setGrnmdlccanadguiidequzEarned(0);
    setGrnmdlccanadguiidequzStage('question');
  }, []);

  useFocusEffect(
    useCallback(() => {
      setGrnmdlccanadguiidequzStage('intro');
    }, []),
  );

  const grnmdlccanadguiidequzChoose = useCallback(
    (optId: GrnmdlccanadguiidequzOptionId) => {
      if (!grnmdlccanadguiidequzCurrent) {
        return;
      }
      if (grnmdlccanadguiidequzAnsweredCorrect !== null) {
        return;
      }

      setGrnmdlccanadguiidequzSelectedOption(optId);
      const ok = optId === grnmdlccanadguiidequzCurrent.correctOptionId;
      setGrnmdlccanadguiidequzAnsweredCorrect(ok);
      if (ok) {
        setGrnmdlccanadguiidequzCorrectCount(c => c + 1);
        setGrnmdlccanadguiidequzEarned(
          e => e + grnmdlccanadguiidequzLeavesPerCorrect,
        );
      }
    },
    [grnmdlccanadguiidequzAnsweredCorrect, grnmdlccanadguiidequzCurrent],
  );

  const grnmdlccanadguiidequzNext = useCallback(async () => {
    if (grnmdlccanadguiidequzAnsweredCorrect === null) {
      return;
    }

    const isLast =
      grnmdlccanadguiidequzIdx === grnmdlccanadguiidequzTotalQuestions - 1;
    if (isLast) {
      const nextBalance =
        grnmdlccanadguiidequzBalance + grnmdlccanadguiidequzEarned;
      setGrnmdlccanadguiidequzBalance(nextBalance);
      await grnmdlccanadguiidequzSaveBalance(nextBalance);
      setGrnmdlccanadguiidequzStage('result');
      return;
    }

    setGrnmdlccanadguiidequzIdx(i => i + 1);
    setGrnmdlccanadguiidequzSelectedOption(null);
    setGrnmdlccanadguiidequzAnsweredCorrect(null);
  }, [
    grnmdlccanadguiidequzAnsweredCorrect,
    grnmdlccanadguiidequzBalance,
    grnmdlccanadguiidequzEarned,
    grnmdlccanadguiidequzIdx,
  ]);

  const grnmdlccanadguiidequzShareResult = useCallback(async () => {
    try {
      await Share.share({
        title: 'Canada Quiz',
        message: `🍁 Canada Quiz Complete!\nCorrect: ${grnmdlccanadguiidequzCorrectCount}/${grnmdlccanadguiidequzTotalQuestions}\nEarned: +${grnmdlccanadguiidequzEarned} maple leaves`,
      });
    } catch {
      // ignore
    }
  }, [grnmdlccanadguiidequzCorrectCount, grnmdlccanadguiidequzEarned]);

  return (
    <Grnmdlccanadguiidlay>
      <View style={styles.grnmdlccanadguiidequzroot}>
        {grnmdlccanadguiidequzStage === 'intro' ? (
          <View style={styles.grnmdlccanadguiidequzpad}>
            <Text style={styles.grnmdlccanadguiidequzkicker}>CHALLENGE</Text>
            <Text style={styles.grnmdlccanadguiidequzh1}>Canada Quiz</Text>

            <View style={{marginTop: 64}}>
              <View style={styles.grnmdlccanadguiidequzhero}>
                <LinearGradient
                  colors={['#1A3522', '#2A5535']}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.grnmdlccanadguiidequzheroleaf}>🍁</Text>
                <Text style={styles.grnmdlccanadguiidequzherotext}>
                  {grnmdlccanadguiidequzTotalQuestions} Questions ·{' '}
                  {grnmdlccanadguiidequzLeavesPerCorrect} Leaves Each
                </Text>
              </View>
            </View>

            <View style={styles.grnmdlccanadguiidequzstatsrow}>
              <View style={styles.grnmdlccanadguiidequzstatcard}>
                <Text style={styles.grnmdlccanadguiidequzstaticon}>🎯</Text>
                <Text style={styles.grnmdlccanadguiidequzstatvalue}>5</Text>
                <Text style={styles.grnmdlccanadguiidequzstatlabel}>
                  Questions
                </Text>
              </View>
              <View style={styles.grnmdlccanadguiidequzstatcard}>
                <Text style={styles.grnmdlccanadguiidequzstaticon}>🧾</Text>
                <Text style={styles.grnmdlccanadguiidequzstatvalue}>4</Text>
                <Text style={styles.grnmdlccanadguiidequzstatlabel}>
                  Options each
                </Text>
              </View>
              <View style={styles.grnmdlccanadguiidequzstatcard}>
                <Text style={styles.grnmdlccanadguiidequzstaticon}>✅</Text>
                <Text style={styles.grnmdlccanadguiidequzstatvalue}>🍁×2</Text>
                <Text style={styles.grnmdlccanadguiidequzstatlabel}>
                  Per correct
                </Text>
              </View>
            </View>

            <View style={styles.grnmdlccanadguiidequzbalancecard}>
              <Text style={styles.grnmdlccanadguiidequzbalancetext}>
                <Text
                  style={[
                    styles.grnmdlccanadguiidequzbalancetext,
                    {color: '#FFFFFF99', fontSize: 12},
                  ]}>
                  🍁 Your balance:
                </Text>{' '}
                {grnmdlccanadguiidequzBalance} maple leaves
              </Text>
            </View>

            <Pressable
              onPress={grnmdlccanadguiidequzStart}
              style={styles.grnmdlccanadguiidequzstartbtn}>
              <Image source={require('../../assets/i/grnmdlccncbrn.png')} />
              <Text style={styles.grnmdlccanadguiidequzstartbtntext}>
                Start Quiz
              </Text>
            </Pressable>
          </View>
        ) : null}

        {grnmdlccanadguiidequzStage === 'question' &&
        grnmdlccanadguiidequzCurrent ? (
          <View style={[styles.grnmdlccanadguiidequzpad, {flex: 1}]}>
            <View style={styles.grnmdlccanadguiidequzprogbar}>
              <View style={styles.grnmdlccanadguiidequzprogsegwrap}>
                {Array.from({length: 5}).map(
                  (_, grnmdlccanadguiidequzSegIdx) => {
                    const grnmdlccanadguiidequzActiveSegIdx = Math.min(
                      4,
                      Math.max(
                        0,
                        Math.floor(grnmdlccanadguiidequzProgress * 5),
                      ),
                    );
                    const grnmdlccanadguiidequzSegFill = Math.max(
                      0,
                      Math.min(
                        1,
                        grnmdlccanadguiidequzProgress * 5 -
                          grnmdlccanadguiidequzSegIdx,
                      ),
                    );

                    return (
                      <View
                        key={grnmdlccanadguiidequzSegIdx}
                        style={[
                          styles.grnmdlccanadguiidequzprogseg,
                          grnmdlccanadguiidequzSegIdx ===
                          grnmdlccanadguiidequzActiveSegIdx
                            ? styles.grnmdlccanadguiidequzprogsegactive
                            : null,
                        ]}>
                        <View
                          style={[
                            styles.grnmdlccanadguiidequzprogfill,
                            {width: `${grnmdlccanadguiidequzSegFill * 100}%`},
                          ]}
                        />
                      </View>
                    );
                  },
                )}
              </View>
            </View>

            <View style={styles.grnmdlccanadguiidequzprogrow}>
              <Text style={styles.grnmdlccanadguiidequzproglbl}>
                QUESTION {grnmdlccanadguiidequzIdx + 1} OF{' '}
                {grnmdlccanadguiidequzTotalQuestions}
              </Text>
              <Text style={styles.grnmdlccanadguiidequzearned}>
                🍁 {grnmdlccanadguiidequzEarned} earned
              </Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.grnmdlccanadguiidequzqcard}>
                <Text style={styles.grnmdlccanadguiidequzqtext}>
                  {grnmdlccanadguiidequzCurrent.prompt}
                </Text>
              </View>

              <View style={styles.grnmdlccanadguiidequzoptgrid}>
                {grnmdlccanadguiidequzCurrent.options.map(opt => {
                  const selected =
                    opt.id === grnmdlccanadguiidequzSelectedOption;
                  const answered =
                    grnmdlccanadguiidequzAnsweredCorrect !== null;
                  const correct =
                    opt.id === grnmdlccanadguiidequzCurrent.correctOptionId;

                  const stateStyle =
                    answered && selected && correct
                      ? styles.grnmdlccanadguiidequzoptcorrect
                      : answered && selected && !correct
                      ? styles.grnmdlccanadguiidequzoptwrong
                      : selected
                      ? styles.grnmdlccanadguiidequzoptselected
                      : null;

                  return (
                    <Pressable
                      key={opt.id}
                      disabled={answered}
                      onPress={() => grnmdlccanadguiidequzChoose(opt.id)}
                      style={[styles.grnmdlccanadguiidequzopt, stateStyle]}>
                      <Text style={styles.grnmdlccanadguiidequzopttext}>
                        {opt.text}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {grnmdlccanadguiidequzAnsweredCorrect !== null ? (
              <View
                style={[
                  styles.grnmdlccanadguiidequzfeedback,
                  grnmdlccanadguiidequzAnsweredCorrect
                    ? styles.grnmdlccanadguiidequzfeedbackok
                    : styles.grnmdlccanadguiidequzfeedbackbad,
                ]}>
                <Text
                  style={[
                    styles.grnmdlccanadguiidequzfeedbacktext,
                    {
                      color: grnmdlccanadguiidequzAnsweredCorrect
                        ? '#0ACC00'
                        : '#CC0003',
                    },
                  ]}>
                  {grnmdlccanadguiidequzAnsweredCorrect
                    ? 'Correct!'
                    : 'Not Correct!'}
                </Text>
              </View>
            ) : (
              <View style={{minHeight: 98}} />
            )}

            <View style={{flex: 1, justifyContent: 'center', marginBottom: 70}}>
              <View style={styles.grnmdlccanadguiidequzbottomrow}>
                <Pressable
                  onPress={() => setGrnmdlccanadguiidequzStage('intro')}
                  style={styles.grnmdlccanadguiidequzbackbtn}>
                  <Image
                    source={require('../../assets/i/grnmdlccncrbackarr.png')}
                  />
                </Pressable>

                <Pressable
                  onPress={grnmdlccanadguiidequzNext}
                  disabled={grnmdlccanadguiidequzAnsweredCorrect === null}
                  style={[
                    styles.grnmdlccanadguiidequznextbtn,
                    grnmdlccanadguiidequzAnsweredCorrect === null &&
                      styles.grnmdlccanadguiidequznextbtndisabled,
                  ]}>
                  <Text style={styles.grnmdlccanadguiidequznextbtntext}>
                    {grnmdlccanadguiidequzAnsweredCorrect === null
                      ? 'Choose'
                      : grnmdlccanadguiidequzIdx ===
                        grnmdlccanadguiidequzTotalQuestions - 1
                      ? 'Result'
                      : 'Next'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}

        {grnmdlccanadguiidequzStage === 'result' ? (
          <View
            style={[
              styles.grnmdlccanadguiidequzpad,
              {flex: 1, justifyContent: 'center'},
            ]}>
            <Text style={styles.grnmdlccanadguiidequzresulttitle}>
              Quiz Complete!
            </Text>
            <Text style={styles.grnmdlccanadguiidequzresultsub}>
              You answered {grnmdlccanadguiidequzCorrectCount} of{' '}
              {grnmdlccanadguiidequzTotalQuestions} questions correctly
            </Text>
            <View style={styles.grnmdlccanadguiidequzresultcircle}>
              <Text style={styles.grnmdlccanadguiidequzresultscore}>
                {grnmdlccanadguiidequzCorrectCount}/
                {grnmdlccanadguiidequzTotalQuestions}
              </Text>
              <Text style={styles.grnmdlccanadguiidequzresultsmall}>
                correct
              </Text>
            </View>
            <View style={styles.grnmdlccanadguiidequzresultearncard}>
              <Text style={styles.grnmdlccanadguiidequzresultearnbig}>
                🍁 +{grnmdlccanadguiidequzEarned} Maple Leaves
              </Text>
              <Text style={styles.grnmdlccanadguiidequzresultearnsub}>
                added to your collection
              </Text>
            </View>
            <Text style={styles.grnmdlccanadguiidequzresultbalance}>
              Total balance: {grnmdlccanadguiidequzBalance} 🍁
            </Text>
            <Pressable
              onPress={grnmdlccanadguiidequzShareResult}
              style={styles.grnmdlccanadguiidequzsharebtn}>
              <Text style={styles.grnmdlccanadguiidequzsharebtntext}>
                Share
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setGrnmdlccanadguiidequzStage('intro')}
              style={styles.grnmdlccanadguiidequzresultbackbtn}>
              <Text style={styles.grnmdlccanadguiidequzresultbackbtntext}>
                Back
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Grnmdlccanadguiidlay>
  );
}

const styles = StyleSheet.create({
  grnmdlccanadguiidequzhero: {
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzheroleaf: {fontSize: 54, marginBottom: 10},
  grnmdlccanadguiidequzherotext: {
    color: '#CCB500',
    fontSize: 15,
    fontWeight: '700',
  },

  grnmdlccanadguiidequzroot: {flex: 1, paddingBottom: 110},
  grnmdlccanadguiidequzpad: {paddingHorizontal: 20, paddingTop: 60},
  grnmdlccanadguiidequzkicker: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
  },
  grnmdlccanadguiidequzh1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },

  grnmdlccanadguiidequzstatsrow: {flexDirection: 'row', gap: 12, marginTop: 14},
  grnmdlccanadguiidequzstatcard: {
    flex: 1,
    minHeight: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1CB2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 10,
  },
  grnmdlccanadguiidequzstaticon: {fontSize: 14, marginBottom: 8},
  grnmdlccanadguiidequzstatvalue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  grnmdlccanadguiidequzstatlabel: {
    color: '#FFFFFF70',
    fontSize: 10,
    fontWeight: '500',
  },
  grnmdlccanadguiidequzbalancecard: {
    marginTop: 24,
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCB50026',
    backgroundColor: '#CCB50014',
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzbalancetext: {
    color: '#CCB500',
    fontWeight: '700',
    fontSize: 14,
  },
  grnmdlccanadguiidequzstartbtn: {
    marginTop: 28,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#CCB500',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  grnmdlccanadguiidequzstartbtntext: {
    color: '#0A1810',
    fontSize: 15,
    fontWeight: '700',
  },

  grnmdlccanadguiidequzprogrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  grnmdlccanadguiidequzproglbl: {
    color: '#FFFFFF55',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.6,
  },
  grnmdlccanadguiidequzearned: {
    color: '#CCB500',
    fontSize: 12,
    fontWeight: '700',
  },
  grnmdlccanadguiidequzprogbar: {
    height: 3,
    borderRadius: 3,
    marginTop: 10,
  },
  grnmdlccanadguiidequzprogfill: {height: 3, backgroundColor: '#CCB500'},
  grnmdlccanadguiidequzprogsegwrap: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  grnmdlccanadguiidequzprogseg: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#FFFFFF14',
    overflow: 'hidden',
  },
  grnmdlccanadguiidequzprogsegactive: {
    backgroundColor: '#CCB50033',

    borderColor: '#CCB500',
  },
  grnmdlccanadguiidequzqcard: {
    marginTop: 72,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1CCC',
    padding: 16,
    minHeight: 90,
    justifyContent: 'center',
    marginBottom: 20,
  },
  grnmdlccanadguiidequzqtext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  grnmdlccanadguiidequzoptgrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  grnmdlccanadguiidequzopt: {
    width: '47%',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF0F',
    backgroundColor: '#152B1CCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  grnmdlccanadguiidequzoptselected: {borderColor: '#CCB500'},
  grnmdlccanadguiidequzoptcorrect: {
    backgroundColor: '#0ACC0080',
    borderColor: '#0ACC00',
  },
  grnmdlccanadguiidequzoptwrong: {
    backgroundColor: '#CC000380',
    borderColor: '#CC0003',
  },
  grnmdlccanadguiidequzopttext: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  grnmdlccanadguiidequzfeedback: {
    marginTop: 18,
    minHeight: 86,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzfeedbackok: {
    backgroundColor: '#0ACC0080',
    borderColor: '#0ACC00',
  },
  grnmdlccanadguiidequzfeedbackbad: {
    backgroundColor: '#CC000380',
    borderColor: '#CC0003',
  },
  grnmdlccanadguiidequzfeedbacktext: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  grnmdlccanadguiidequzbottomrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
    paddingBottom: 20,
  },
  grnmdlccanadguiidequzbackbtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#CCB500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzbackbtntext: {
    color: '#0A1810',
    fontSize: 20,
    fontWeight: '900',
    marginTop: -2,
  },
  grnmdlccanadguiidequznextbtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#CCB500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequznextbtndisabled: {opacity: 0.6},
  grnmdlccanadguiidequznextbtntext: {
    color: '#0A1810',
    fontSize: 16,
    fontWeight: '800',
  },
  grnmdlccanadguiidequzresulttitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  grnmdlccanadguiidequzresultsub: {
    color: '#FFFFFF70',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
  grnmdlccanadguiidequzresultcircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#CCB50066',
    backgroundColor: '#CCB5001A',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 26,
  },
  grnmdlccanadguiidequzresultscore: {
    color: '#CCB500',
    fontSize: 32,
    fontWeight: '800',
  },
  grnmdlccanadguiidequzresultsmall: {
    color: '#FFFFFF70',
    marginTop: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  grnmdlccanadguiidequzresultearncard: {
    marginTop: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCB50026',
    backgroundColor: '#CCB5001A',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzresultearnbig: {
    color: '#CCB500',
    fontSize: 16,
    fontWeight: '900',
  },
  grnmdlccanadguiidequzresultearnsub: {
    color: '#FFFFFF70',
    fontSize: 12,
    marginTop: 6,
  },
  grnmdlccanadguiidequzresultbalance: {
    color: '#FFFFFF70',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
  grnmdlccanadguiidequzsharebtn: {
    marginTop: 18,
    width: '96%',
    alignSelf: 'center',
    height: 51,
    borderRadius: 16,
    backgroundColor: '#CCB500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzsharebtntext: {
    color: '#0A1810',
    fontSize: 14,
    fontWeight: '600',
  },
  grnmdlccanadguiidequzresultbackbtn: {
    marginTop: 12,
    height: 51,
    width: '74%',
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCB5004D',
    backgroundColor: '#152B1CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grnmdlccanadguiidequzresultbackbtntext: {
    color: '#CCB500',
    fontSize: 14,
    fontWeight: '600',
  },
});
