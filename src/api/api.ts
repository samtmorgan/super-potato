import { ERROR, IP, NOT_INITIALIZED, SUCCESS } from '@/constants/statuses';
// import { resolveWeatherIcon } from '@/utils/weatherAssets';
import { AddressStatus, ApiStatus, ICoords, IWeather, LocationStatus, Weather } from '../types/types';

const protocol = 'https://';

// refactor this as pe the others...
// gets the weather for the given
export async function getWeather(
  url: string,
  setState: (data: IWeather) => void,
  setStatus: (status: ApiStatus) => void,
) {
  try {
    const res = await fetch(url);
    const result = await res.json();
    setState(result);
    setStatus(SUCCESS);
  } catch (error) {
    setStatus(ERROR);
  }
}

// TODO: remove setWeather param
export async function getWeather1(
  coords: ICoords,
  setWeather: (data: IWeather) => void,
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
    // console.log({ result });
    const currentAssets: Weather = {
      current: {
        temp: `${result.current.temp.toFixed(0)}°c`,
        iconCode: result.current.weather[0].icon,
        text: result.current.weather[0].description,
      },
    };
    setWeatherAssets(currentAssets);
    setWeatherStatus(SUCCESS);
  } catch (error) {
    setWeatherStatus(ERROR);
  }
}

// Gets the reverse geocode -> an address from coordinates
export async function getReverseGeocode(
  lng: number,
  lat: number,
  setState: (data: string) => void,
  setStatus: (status: AddressStatus) => void,
  //   type: 'district' | 'postcode' = 'district',
) {
  const host = 'api.mapbox.com/';
  const path = 'geocoding/v5/mapbox.places/';
  const coords = `${lng},${lat}.json?`;
  const types = `types=locality&`;

  const key = `access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  const url = protocol + host + path + coords + types + key;

  try {
    const res = await fetch(url);
    const result = await res.json();
    setState(result.features[0].text);
    setStatus(SUCCESS);
  } catch (error) {
    setStatus(NOT_INITIALIZED);
  }
}

// gets the IP location
export async function getIpGeo(setState: (data: ICoords) => void, setStatus: (status: LocationStatus) => void) {
  const key = process.env.NEXT_PUBLIC_IP_GEOLOCATION || '';
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}`;
  try {
    const res = await fetch(url);
    const result = await res.json();
    setState({ lat: result.latitude, lng: result.longitude, coordsType: IP });
    setStatus(SUCCESS);
  } catch (error) {
    setStatus(NOT_INITIALIZED);
  }
}
