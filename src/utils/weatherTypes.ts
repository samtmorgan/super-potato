import { IWeatherAssets } from '@/types/types';
import { WiDaySunny, WiNightClear, WiNa } from 'react-icons/wi';

export const getWeatherAssets = (weatherCode: number, isDay: number): IWeatherAssets => {
  if (weatherCode === 0) {
    return {
      text: 'Clear sky',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    return {
      text: 'Mainly clear, partly cloudy, and overcast',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return {
      text: 'Fog and depositing rime fog',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
    return {
      text: 'Drizzle: Light, moderate, and dense intensity',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 56 || weatherCode === 57) {
    return {
      text: 'Freezing Drizzle: Light and dense intensity',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
    return {
      text: 'Rain: Slight, moderate and heavy intensity',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 66 || weatherCode === 67) {
    return {
      text: 'Freezing Rain: Light and heavy intensity',
      icon: isDay ? WiDaySunny : WiNightClear,
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
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return {
      text: 'Thunderstorm: Slight or moderate',
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }
  return {
    text: 'Unknown',
    icon: WiNa,
  };
};
