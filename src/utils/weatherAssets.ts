import { WeatherAssetsStatic } from '@/types/types';
import {
  WiDaySunny,
  WiNightClear,
  WiNa,
  WiDayCloudy,
  WiNightThunderstorm,
  WiDayThunderstorm,
  WiDaySnow,
  WiNightSnow,
  WiDayRain,
  WiNightRain,
  WiDayRainMix,
  WiNightRainMix,
  WiDayFog,
  WiNightFog,
  WiNightAltCloudy,
  WiNightShowers,
  WiDayShowers,
} from 'react-icons/wi';

export const getWeatherAssets = (weatherCode: number, isDay: number): WeatherAssetsStatic => {
  if (weatherCode === 0) {
    return {
      text: 'Clear sky',
      icon: isDay ? WiDaySunny : WiNightClear,
      weatherSearchTerm: 'clear&sun&sky',
    };
  }
  if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    return {
      text: 'Mainly clear, partly cloudy, and overcast',
      icon: isDay ? WiDayCloudy : WiNightAltCloudy,
      weatherSearchTerm: 'clouds&sky',
    };
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return {
      text: 'Fog and depositing rime fog',
      icon: isDay ? WiDayFog : WiNightFog,
      weatherSearchTerm: 'fog&forest',
    };
  }
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
    return {
      text: 'Drizzle: Light, moderate, and dense intensity',
      icon: isDay ? WiDayRainMix : WiNightRainMix,
      weatherSearchTerm: 'light&rain',
    };
  }
  if (weatherCode === 56 || weatherCode === 57) {
    return {
      text: 'Freezing Drizzle: Light and dense intensity',
      icon: isDay ? WiDayRainMix : WiNightRainMix,
      weatherSearchTerm: 'light&rain',
    };
  }
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
    return {
      text: 'Rain: Slight, moderate and heavy intensity',
      icon: isDay ? WiDayRainMix : WiNightRainMix,
      weatherSearchTerm: 'heavy&rain',
    };
  }
  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    return {
      text: 'Rain showers: Slight, moderate, and violent',
      icon: isDay ? WiDayShowers : WiNightShowers,
      weatherSearchTerm: 'rain&showers',
    };
  }
  if (weatherCode === 66 || weatherCode === 67) {
    return {
      text: 'Freezing Rain: Light and heavy intensity',
      icon: isDay ? WiDayRain : WiNightRain,
      weatherSearchTerm: 'heavy&rain',
    };
  }
  if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return {
      text: 'Snow fall: Slight, moderate, and heavy intensity',
      icon: isDay ? WiDaySnow : WiNightSnow,
      weatherSearchTerm: 'snow',
    };
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return {
      text: 'Thunderstorm: Slight or moderate',
      icon: isDay ? WiDayThunderstorm : WiNightThunderstorm,
      weatherSearchTerm: 'thunderstorm',
    };
  }
  return {
    text: 'Unknown',
    icon: WiNa,
    weatherSearchTerm: 'clear',
  };
};
