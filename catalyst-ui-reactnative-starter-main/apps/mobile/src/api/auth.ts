import {axiosInstance, axiosInstanceWithAbort} from '@core/network';

type LoginInput = {
  username: string;
  password: string;
};
type LoginResponse = {
  accessToken: string;
  name: string;
};

type ResponseWithAbort<T> = {
  ajaxPromise: Promise<T>;
  abort: () => void;
};

type ResponseWithoutAbort<T> = T;

const getPromise = <T, R = LoginResponse>(
  promise: Promise<T>,
): Promise<ResponseWithoutAbort<R>> =>
  new Promise((resolve, reject) => {
    promise
      .then((response: any) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const AuthActions = {
  login: <T = LoginResponse>(
    data: LoginInput,
  ): Promise<ResponseWithoutAbort<T>> => {
    const promise = axiosInstance.post('/login', data);
    return getPromise(promise);
  },

  loginWithAbort: <T>(data: LoginInput): ResponseWithAbort<T> => {
    const {axiosPromise, abort} = axiosInstanceWithAbort.post('/login', data);
    return {
      ajaxPromise: getPromise(axiosPromise),
      abort,
    };
  },

  getUser: <T = any>(Id: number): Promise<ResponseWithoutAbort<T>> => {
    const promise = axiosInstance.get(
      `https://jsonplaceholder.typicode.com/users/${Id}`,
    );
    return getPromise(promise);
  },
};

export default AuthActions;
