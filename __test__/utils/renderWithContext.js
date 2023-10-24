import { render } from '@testing-library/react';
import React from 'react';
import { LOADING, SUCCESS } from '@/constants/statuses';
import { AppContext } from '../../src/context/AppContext';

// A custom render to setup providers. Extends regular
// render options with `providerProps` to allow injecting
// different scenarios to test with.
// @see https://testing-library.com/docs/react-testing-library/setup#custom-render
export function renderWithContext(ui, { providerProps, ...renderOptions }) {
  return render(<AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>, renderOptions);
}

export const initProviderProps = {
  value: {
    coords: null,
    setCoords: () => {},
    searchValue: '',
    setSearchValue: () => {},
    weatherAssets: null,
    setWeatherAssets: () => {},
    address: null,
    setAddress: () => {},
    weatherStatus: LOADING,
    setWeatherStatus: () => {},
    locationStatus: LOADING,
    addressStatus: LOADING,
    setLocationStatus: () => {},
    searchResults: null,
    setSearchResults: () => {},
  },
};

export const successProviderProps = {
  value: {
    coords: { lat1: 1, lng: 1 },
    setCoords: () => {},
    searchValue: '',
    setSearchValue: () => {},
    weatherAssets: {
      current: {
        temp: '12',
        iconCode: '01d',
        text: 'Clear',
      },
      alerts: null,
    },
    setWeatherAssets: () => {},
    address: 'here',
    setAddress: () => {},
    weatherStatus: SUCCESS,
    setWeatherStatus: () => {},
    locationStatus: SUCCESS,
    addressStatus: SUCCESS,
    setLocationStatus: () => {},
    searchResults: null,
    setSearchResults: () => {},
  },
};
