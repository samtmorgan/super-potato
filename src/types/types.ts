import { IconType } from 'react-icons';

export interface ICoords {
  lat: number | null;
  lng: number | null;
}

export interface IContextType {
  coords: ICoords | null;
  setCoords: (coords: ICoords) => void;
  weather: IWeather | null;
  weatherAssets: IWeatherAssets | null;
  address: string | null;
  weatherStatus: string;
  setWeatherStatus: (status: string) => void;
  resetState: () => void;
}

export interface IWeather {
  current_weather: {
    temperature: number;
    weathercode: number;
    is_day: number;
  };
}

export interface IWeatherAssets {
  text: string;
  icon: IconType;
}
