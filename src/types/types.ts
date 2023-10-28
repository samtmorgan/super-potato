import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export interface ICoords {
  lat: number;
  lng: number;
}

export interface IContextType {
  coords: ICoords | null;
  setCoords: (coords: ICoords) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  weatherAssets: Weather | null;
  setWeatherAssets: (weatherAssets: Weather) => void;
  address: string | null;
  setAddress: (address: string) => void;
  addressStatus: AddressStatus;
  weatherStatus: WeatherStatus;
  setWeatherStatus: (status: WeatherStatus) => void;
  locationStatus: LocationStatus;
  setLocationStatus: (status: LocationStatus) => void;
  searchResults: SearchResult[] | null;
  setSearchResults: (searchResults: SearchResult[] | null) => void;
}

export type SearchResult = {
  text: string;
  type: string;
};

export type Weather = {
  current: {
    temp: string;
    iconCode: WeatherIcon;
    text: string;
  };
  alerts: WeatherAlert[] | null;
};

export type WeatherAlertApi = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
};

export type WeatherAlert = {
  senderName: string;
  event: string;
  start: number;
  end: number;
  description: string;
};

export type WeatherTimeRangeType = {
  start: number;
  end: number;
};

export type ModalType = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: ReactElement;
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

export type Suggestion = {
  name: string;
  place_formatted: string;
  feature_type: string;
};

export interface IWeatherAssets extends WeatherAssetsStatic {
  temperature: number;
}

export type WeatherStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type LocationStatus = 'LOADING' | 'DENIED' | 'SUCCESS' | 'ERROR';
export type ApiStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type AddressStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type CoordsType = 'LOADING' | 'IP' | 'BROWSER' | 'GEOCODED';

export type apiRequest<DataType> = {
  url: string;
  setState: (data: DataType) => void;
  setStatus: (status: ApiStatus) => void;
};
