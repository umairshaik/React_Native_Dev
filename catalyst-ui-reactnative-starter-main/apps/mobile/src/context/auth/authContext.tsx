import {PropsWithChildren, useContext, createContext, useMemo} from 'react';
import {AuthState, AuthMethods} from '../../hooks/auth/types';
import useAuth from '../../hooks/auth/useAuth';

type AuthContextType = AuthMethods & AuthState;
const initialState = {
  loading: false,
};
const AuthContext = createContext(initialState as AuthContextType);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const {authState, authMethods} = useAuth();
  const providerValue = useMemo(
    () => ({...authMethods, ...authState}),
    [authMethods, authState],
  );
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
