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
  weatherStatus: WeatherStatus;
  setWeatherStatus: (status: WeatherStatus) => void;
  locationStatus: LocationStatus;
  setLocationStatus: (status: LocationStatus) => void;
  resetState: () => void;
}

export interface IWeather {
  current_weather: {
    temperature: number;
    weathercode: number;
    is_day: number;
  };
}

export type WeatherAssetsStatic = {
  text: string;
  icon: IconType;
  weatherSearchTerm?: string;
};

// export interface IWeatherAssets {
//     temperature: number;
//     text: string;
//     icon: IconType;
//   }

export interface IWeatherAssets extends WeatherAssetsStatic {
  temperature: number;
}

export type WeatherStatus = 'NOT_INITIALIZED' | 'LOADING' | 'SUCCESS' | 'ERROR';
export type LocationStatus = 'NOT_INITIALIZED' | 'LOADING' | 'DENIED' | 'GRANTED' | 'NOT_SUPPORTED';
