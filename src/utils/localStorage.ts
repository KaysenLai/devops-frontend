import {
  merge, omitBy,
} from 'lodash';

const store: Storage = localStorage;
const memoryStore = new Map();

/**
 * @private
 *
 * @description
 * Makes a app specific key from the specified original key.
 */
const makeKey = (key: string) => `${key}`;

/**
 * @description
 * Trim prefix from key in session store.
 * @param key
 */
export function removePrefix(key: string) {
  return key.substr(key.indexOf('-') + 1);
}

/**
 * @description
 * Returns whether or not the key exists in the store.
 */
export function has(key: string, memory = false): boolean {
  return memory ? memoryStore.has(makeKey(key)) : store.getItem(makeKey(key)) !== null;
}

/**
 * @description
 * Gets the value at the specified key.
 */
export function get<T>(key: string, memory = false): T {
  return memory ? memoryStore.get(makeKey(key))
  || Object.create(null) : store.getItem(makeKey(key));
}

/**
 * @description
 * Puts an Object or String into your defined store.
 */
export function put<T>(key: string, value: T, memory = false): T {
  if (memory) {
    memoryStore.set(makeKey(key), value);
    return memoryStore.get(makeKey(key));
  }
  store.setItem(
    makeKey(key),
    JSON.stringify(value, (jKey, jValue) => (/^\${2}/.test(jKey) ? undefined : jValue)),
  );
  return get<T>(key);
}

/**
 * @description
 * A method that will merge the new value with the current value at the key.
 */
export function patch<T>(key: string, value: Partial<T>): T {
  const currentValue = get<T>(key);

  const removeKeys = Object.entries(value)
    .filter(([, removeValue]) => removeValue === undefined)
    .map(([removeKey]) => removeKey);

  // Has to be `any`, because Lodash has a Dictionary type - that noone can use.
  const newObj: any = omitBy(
    merge(currentValue, value), (_, thisKey) => removeKeys.includes(thisKey),
  );
  return put<T>(key, newObj);
}

/**
 * @description
 * Deletes the specified key from the store, and returns what it deleted.
 */
export function del<T>(key: string, memory = false): T {
  const tmp = get<T>(key, memory);

  if (memory) {
    memoryStore.delete(makeKey(key));
  } else {
    store.removeItem(makeKey(key));
  }

  return tmp;
}

/**
 * @description
 * Deletes all keys from the store.
 */
export function clearLocalStorage(memory = false) {
  const storeToUse = memory ? memoryStore : store;

  storeToUse.clear();
}
