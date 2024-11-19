export type Value = string | null;
export type KeyValuePair = [string, Value];
export type Callback = (err?: Error | null | undefined) => void;
export type CallbackWithResult = (
  err?: Error | null | undefined,
  value?: Value,
) => void;

export type CallbackWithResults = (
  err?: Error | null | undefined,
  values?: readonly KeyValuePair[],
) => void;
export type KeyValueStatic = {
  setItem(key: string, value: string, callback?: Callback): Promise<void>;

  getItem(key: string, callback?: Callback): Promise<Value>;
  deleteItem(key: string, callback?: Callback): Promise<void>;
  multiGet(
    keys: string[],
    callback?: Callback,
  ): Promise<readonly KeyValuePair[]>;
  getAllItems(callback?: Callback): Promise<readonly KeyValuePair[]>;
  clear(callback?: Callback): Promise<void>;
};
