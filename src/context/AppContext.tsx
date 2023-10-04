import { createContext, useContext, useState } from 'react';

interface ICoords {
  lat: number;
  lng: number;
}

interface IContextType {
  coords: ICoords | null;
  setCoords: (coords: ICoords) => void;
  loading: boolean;
}

const AppContext = createContext<IContextType>({ coords: null, setCoords: () => {}, loading: true });

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext was used outside of its Provider');
  }
  return context;
};

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<ICoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return <AppContext.Provider value={{ coords, setCoords, loading }}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
