import React, {createContext, useContext, useMemo, useState} from 'react';

type AuthContextValue = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({children}: Props): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      login: () => setIsLoggedIn(true),
      logout: () => setIsLoggedIn(false),
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
