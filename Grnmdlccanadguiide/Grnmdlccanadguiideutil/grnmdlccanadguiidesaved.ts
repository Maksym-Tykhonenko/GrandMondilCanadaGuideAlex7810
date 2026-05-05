import AsyncStorage from '@react-native-async-storage/async-storage';

const grnmdlccanadguiideSavedKey = 'grnmdlccanadguiide:savedLocationIds:v1';

const grnmdlccanadguiideNormalize = (ids: unknown): string[] => {
  if (!Array.isArray(ids)) return [];
  return ids.filter(x => typeof x === 'string');
};

export const grnmdlccanadguiideGetSavedIds = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(grnmdlccanadguiideSavedKey);
    if (!raw) return [];
    return grnmdlccanadguiideNormalize(JSON.parse(raw));
  } catch {
    return [];
  }
};

export const grnmdlccanadguiideSetSavedIds = async (
  ids: string[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(grnmdlccanadguiideSavedKey, JSON.stringify(ids));
  } catch {
    console.log('error');
  }
};

export const grnmdlccanadguiideToggleSavedId = async (
  id: string,
): Promise<{ids: string[]; isSaved: boolean}> => {
  const current = await grnmdlccanadguiideGetSavedIds();
  const exists = current.includes(id);
  const next = exists ? current.filter(x => x !== id) : [...current, id];
  await grnmdlccanadguiideSetSavedIds(next);
  return {ids: next, isSaved: !exists};
};
