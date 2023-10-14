import { IconType } from 'react-icons';

export interface ICoords {
  lat: number;
  lng: number;
}

export interface IContextType {
  coords: ICoords | null;
  setCoords: (coords: ICoords) => void;
  weather: IWeather | null;
  weatherAssets: Weather | null;
  address: string | null;
  weatherStatus: WeatherStatus;
  setWeatherStatus: (status: WeatherStatus) => void;
  locationStatus: LocationStatus;
  setLocationStatus: (status: LocationStatus) => void;
}

export interface IWeather {
  current_weather: {
    temperature: number;
    weathercode: number;
    is_day: number;
  };
}

export type Weather = {
  current: {
    temp: string;
    iconCode: WeatherIcon;
    text: string;
  };
};

export type WeatherIcon =
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '03n'
  | '04d'
  | '04n'
  | '09d'
  | '09n'
  | '10d'
  | '10n'
  | '11d'
  | '11n'
  | '13d'
  | '13n'
  | '50d'
  | '50n';

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
export type LocationStatus = 'NOT_INITIALIZED' | 'LOADING' | 'DENIED' | 'SUCCESS' | 'NOT_SUPPORTED';
export type ApiStatus = 'NOT_INITIALIZED' | 'LOADING' | 'SUCCESS' | 'ERROR';

export type apiRequest<DataType> = {
  url: string;
  setState: (data: DataType) => void;
  setStatus: (status: ApiStatus) => void;
};
