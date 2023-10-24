import { ERROR, SUCCESS } from '@/constants/statuses';
import {
  AddressStatus,
  ApiStatus,
  ICoords,
  LocationStatus,
  Weather,
  WeatherAlert,
  WeatherAlertApi,
  WeatherStatus,
} from '../types/types';

const protocol = 'https://';

function parseSearchText(text: string) {
  const strArr = text.split(',');
  //   return `${strArr[0]}, ${strArr.at(-1)}`;
  return strArr[0];
}

export async function getWeather(
  coords: ICoords,
  setWeatherStatus: (status: ApiStatus) => void,
  setWeatherAssets: (weather: Weather) => void,
) {
  const host = 'api.openweathermap.org/';
  const path = 'data/3.0/onecall?';
  const coordinates = `lat=${coords.lat}&lon=${coords.lng}`;
  const units = `&units=metric`;
  const key = `&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY}`;
  const url = protocol + host + path + coordinates + units + key;
  try {
    const res = await fetch(url);
    const result = await res.json();
    console.log(result);
    const currentAssets: Weather = {
      current: {
        temp: `${result.current.temp.toFixed(0)}°c`,
        iconCode: result.current.weather[0].icon,
        text: result.current.weather[0].description,
      },
      alerts: null,
    };
    if (Object.hasOwn(result, 'alerts')) {
      const alerts = result.alerts.map(
        ({ start, end, sender_name: senderName, event }: WeatherAlertApi): WeatherAlert => {
          return { start, end, senderName, event };
        },
      );
      currentAssets.alerts = alerts.length > 0 ? alerts : null;
    }
    setWeatherAssets(currentAssets);
    setWeatherStatus(SUCCESS);
  } catch (error) {
    setWeatherStatus(ERROR);
  }
}

// Gets the an address from coordinates
export async function getReverseGeocode(
  lng: number,
  lat: number,
  setState: (data: string) => void,
  setStatus: (status: AddressStatus) => void,
  //   type: 'district' | 'postcode' = 'district',
) {
  // build the URL
  const host = 'api.mapbox.com/';
  const path = 'geocoding/v5/mapbox.places/';
  const coords = `${lng},${lat}.json?`;
  const types = `types=place&`;
  const key = `access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  const url = protocol + host + path + coords + types + key;
  try {
    const res = await fetch(url);
    const result = await res.json();
    setState(result.features[0].text);
    setStatus(SUCCESS);
  } catch (error) {
    setStatus(ERROR);
  }
}

// Gets the coordinates from an address
export async function getWeatherForSearchResult(
  searchText: string,
  type: string,
  setAddress: (newCoords: string) => void,
  setWeatherAssets: (weather: Weather) => void,
  setWeatherStatus: (status: WeatherStatus) => void,
  setLocationStatus: (status: LocationStatus) => void,

  //   type: 'district' | 'postcode' = 'district',
) {
  // build the URL
  const host = 'api.mapbox.com/';
  const path = 'geocoding/v5/mapbox.places/';
  const search = `${searchText.replace(', ', '%20')}.json?`;
  const key = `&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  const types = `types=${type}`;
  const url = protocol + host + path + search + types + key;
  try {
    const res = await fetch(url);
    const result = await res.json();
    const newCoords = {
      lng: result.features[0].center[0],
      lat: result.features[0].center[1],
    };

    const address = parseSearchText(searchText);
    setAddress(address);
    getWeather(newCoords, setWeatherStatus, setWeatherAssets);
    setLocationStatus(SUCCESS);
  } catch (error) {
    setLocationStatus(ERROR);
  }
}

// gets the IP location
export async function getIpGeo(setState: (data: ICoords) => void, setStatus: (status: LocationStatus) => void) {
  const key = process.env.NEXT_PUBLIC_IP_GEOLOCATION || '';
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}`;
  try {
    const res = await fetch(url);
    const result = await res.json();
    setState({ lat: result.latitude, lng: result.longitude });
    setStatus(SUCCESS);
  } catch (error) {
    setStatus(ERROR);
  }
}
