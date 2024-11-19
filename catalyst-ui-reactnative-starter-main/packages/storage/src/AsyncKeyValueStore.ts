import RnAsyncStorage from '@react-native-async-storage/async-storage';
import type {
  Callback,
  CallbackWithResult,
  CallbackWithResults,
  KeyValuePair,
  KeyValueStatic,
  Value,
} from './types';

interface CacheType {
  [key: string]: {
    value: Value;
    createdAt: Date;
  };
}

export class AsyncKeyValueStore implements KeyValueStatic {
  #cache: CacheType;

  constructor() {
    this.#cache = {};
  }

  getFromCache(key: string): Value {
    const data = this.#cache[key];
    if (data) {
      return data.value;
    }
    return null;
  }

  addIntoCache(key: string, value: Value) {
    this.#cache[key] = {value, createdAt: new Date()};
  }

  removeFromCache(key: string): void {
    delete this.#cache[key];
  }

  resetCache(): void {
    this.#cache = {};
  }

  setItem(key: string, value: string, callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.setItem(key, value)
        .then(() => {
          this.addIntoCache(key, value);
          callback?.();
          resolve();
        })
        .catch(err => {
          callback?.(err);
          reject(err);
        });
    });
  }

  getItem(key: string, callback?: CallbackWithResult): Promise<Value> {
    return new Promise((resolve, reject) => {
      const cachedValue = this.getFromCache(key);
      if (cachedValue === null) {
        RnAsyncStorage.getItem(key)
          .then(result => {
            const value = result;
            this.addIntoCache(key, value);
            callback?.(null, value);
            resolve(value);
          })
          .catch(err => {
            callback?.(err);
            reject(err);
          });
      } else {
        callback?.(null, cachedValue);
        resolve(cachedValue);
      }
    });
  }

  deleteItem(key: string, callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.removeItem(key)
        .then(() => {
          this.removeFromCache(key);
          callback?.();
          resolve();
        })
        .catch(err => {
          callback?.(err);
          reject(err);
        });
    });
  }

  multiGet(
    keys: string[],
    callback?: CallbackWithResults,
  ): Promise<readonly KeyValuePair[]> {
    return new Promise((resolve, reject) => {
      const valuesArray = keys.map(key => this.getItem(key));
      Promise.all(valuesArray)
        .then(values => {
          const result: KeyValuePair[] = keys.map((key, index) => [
            key,
            values[index],
          ]);
          callback?.(null, result);
          resolve(result);
        })
        .catch(err => {
          callback?.(err);
          reject(err);
        });
    });
  }

  getAllItems(
    callback?: CallbackWithResults,
  ): Promise<readonly KeyValuePair[]> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.getAllKeys()
        .then((keys: readonly string[]) => RnAsyncStorage.multiGet(keys))
        .then(result => {
          callback?.(null, result);
          resolve(result);
        })
        .catch(err => {
          callback?.(err);
          reject(err);
        });
    });
  }

  /**
   * Deletes all key value pairs
   */
  // clear = RnAsyncStorage.clear;
  clear(callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.clear()
        .then(() => {
          this.resetCache();
          callback?.();
          resolve();
        })
        .catch(err => {
          callback?.(err);
          reject(err);
        });
    });
  }
}

const asyncKeyValueStore: KeyValueStatic = new AsyncKeyValueStore();
export default asyncKeyValueStore;
