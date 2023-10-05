import { IconType } from 'react-icons';

export interface ICoords {
  lat: number | null;
  lng: number | null;
}

export interface IContextType {
  coords: ICoords | null;
  setCoords: (coords: ICoords) => void;
  loading: boolean;
  weather: IWeather | null;
  weatherAssets: IWeatherAssets | null;
  address: string | null;
  error: boolean;
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
