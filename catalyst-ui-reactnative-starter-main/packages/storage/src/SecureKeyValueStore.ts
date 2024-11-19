import Keychain from 'react-native-keychain';
import {CACHE_EXPIRY_TIME} from './config';
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
export class SecureKeyValueStore implements KeyValueStatic {
  #cache: CacheType;

  TTL: number; // this is in minutes // TODO: when we add env variables/config, add this to config

  constructor(ttl: number) {
    this.#cache = {};
    this.TTL = ttl;
  }

  isCacheExpired(createdAt: Date) {
    return createdAt.getTime() + this.TTL * 60 * 1000 < new Date().getTime();
  }

  getFromCache(key: string): Value {
    const data = this.#cache[key];
    if (data && !this.isCacheExpired(data.createdAt)) {
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

  /**
   * Save a single item
   */
  setItem(key: string, value: string, callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.setGenericPassword(key, value, {service: key})
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

  /**
   * Get a single item
   */
  getItem(key: string, callback?: CallbackWithResult): Promise<Value> {
    return new Promise((resolve, reject) => {
      const cachedValue = this.getFromCache(key);
      if (cachedValue === null) {
        Keychain.getGenericPassword({service: key})
          .then(result => {
            const value = result !== false ? result.password : null;
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

  /**
   * Deletes a single item
   */
  deleteItem(key: string, callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.resetGenericPassword({service: key})
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

  /**
   * Get multiple items
   */
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

  /**
   * Get all the items
   */
  getAllItems(
    callback?: CallbackWithResults,
  ): Promise<readonly KeyValuePair[]> {
    return new Promise((resolve, reject) => {
      Keychain.getAllGenericPasswordServices()
        .then((keys: string[]) => {
          const valuesArray = keys.map(key => this.getItem(key));
          Promise.all(valuesArray)
            .then(values => {
              const result: KeyValuePair[] = values.map((val, index) => [
                keys[index],
                val,
              ]);
              callback?.(null, result);
              resolve(result);
            })
            .catch(err => {
              callback?.(err);
              reject(err);
            });
        })
        .catch(reject);
    });
  }

  /**
   * Deletes all key value pairs
   */
  clear(callback?: Callback): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.resetGenericPassword()
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

const secureKeyValueStore: KeyValueStatic = new SecureKeyValueStore(
  CACHE_EXPIRY_TIME,
);

export default secureKeyValueStore;
