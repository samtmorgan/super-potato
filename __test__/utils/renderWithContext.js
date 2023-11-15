import { render } from '@testing-library/react';
import React from 'react';
import { LOADING, SUCCESS } from '../../src/constants/statuses';
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

const mockPrecipitation = [
  {
    dt: 1700043000,
    precipitation: 0.865,
  },
  {
    dt: 1700043060,
    precipitation: 0.8918,
  },
  {
    dt: 1700043120,
    precipitation: 0.9186,
  },
  {
    dt: 1700043180,
    precipitation: 0.9454,
  },
  {
    dt: 1700043240,
    precipitation: 0.9722,
  },
  {
    dt: 1700043300,
    precipitation: 0.999,
  },
  {
    dt: 1700043360,
    precipitation: 1.0298,
  },
  {
    dt: 1700043420,
    precipitation: 1.0606,
  },
  {
    dt: 1700043480,
    precipitation: 1.0914,
  },
  {
    dt: 1700043540,
    precipitation: 1.1222,
  },
  {
    dt: 1700043600,
    precipitation: 1.153,
  },
  {
    dt: 1700043660,
    precipitation: 1.153,
  },
  {
    dt: 1700043720,
    precipitation: 1.153,
  },
  {
    dt: 1700043780,
    precipitation: 1.153,
  },
  {
    dt: 1700043840,
    precipitation: 1.153,
  },
  {
    dt: 1700043900,
    precipitation: 1.153,
  },
  {
    dt: 1700043960,
    precipitation: 1.2776,
  },
  {
    dt: 1700044020,
    precipitation: 1.4022,
  },
  {
    dt: 1700044080,
    precipitation: 1.5268,
  },
  {
    dt: 1700044140,
    precipitation: 1.6514,
  },
  {
    dt: 1700044200,
    precipitation: 1.776,
  },
  {
    dt: 1700044260,
    precipitation: 1.7284,
  },
  {
    dt: 1700044320,
    precipitation: 1.6808,
  },
  {
    dt: 1700044380,
    precipitation: 1.6332,
  },
  {
    dt: 1700044440,
    precipitation: 1.5856,
  },
  {
    dt: 1700044500,
    precipitation: 1.538,
  },
  {
    dt: 1700044560,
    precipitation: 1.4968,
  },
  {
    dt: 1700044620,
    precipitation: 1.4556,
  },
  {
    dt: 1700044680,
    precipitation: 1.4144,
  },
  {
    dt: 1700044740,
    precipitation: 1.3732,
  },
  {
    dt: 1700044800,
    precipitation: 1.332,
  },
  {
    dt: 1700044860,
    precipitation: 1.3732,
  },
  {
    dt: 1700044920,
    precipitation: 1.4144,
  },
  {
    dt: 1700044980,
    precipitation: 1.4556,
  },
  {
    dt: 1700045040,
    precipitation: 1.4968,
  },
  {
    dt: 1700045100,
    precipitation: 1.538,
  },
  {
    dt: 1700045160,
    precipitation: 1.4302,
  },
  {
    dt: 1700045220,
    precipitation: 1.3224,
  },
  {
    dt: 1700045280,
    precipitation: 1.2146,
  },
  {
    dt: 1700045340,
    precipitation: 1.1068,
  },
  {
    dt: 1700045400,
    precipitation: 0.999,
  },
  {
    dt: 1700045460,
    precipitation: 0.8624,
  },
  {
    dt: 1700045520,
    precipitation: 0.7258,
  },
  {
    dt: 1700045580,
    precipitation: 0.5892,
  },
  {
    dt: 1700045640,
    precipitation: 0.4526,
  },
  {
    dt: 1700045700,
    precipitation: 0.316,
  },
  {
    dt: 1700045760,
    precipitation: 0.2576,
  },
  {
    dt: 1700045820,
    precipitation: 0.1992,
  },
  {
    dt: 1700045880,
    precipitation: 0.1408,
  },
  {
    dt: 1700045940,
    precipitation: 0,
  },
  {
    dt: 1700046000,
    precipitation: 0,
  },
  {
    dt: 1700046060,
    precipitation: 0,
  },
  {
    dt: 1700046120,
    precipitation: 0,
  },
  {
    dt: 1700046180,
    precipitation: 0,
  },
  {
    dt: 1700046240,
    precipitation: 0,
  },
  {
    dt: 1700046300,
    precipitation: 0,
  },
  {
    dt: 1700046360,
    precipitation: 0,
  },
  {
    dt: 1700046420,
    precipitation: 0,
  },
  {
    dt: 1700046480,
    precipitation: 0,
  },
  {
    dt: 1700046540,
    precipitation: 0,
  },
  {
    dt: 1700046600,
    precipitation: 0,
  },
];

export const mockPrecipitationWithNoPrecipitation = mockPrecipitation.map(precipitation => {
  return {
    ...precipitation,
    precipitation: 0,
  };
});

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
      day: {
        tempHighLow: `H: 7°\u00A0\u00A0\u00A0\u00A0L: 4°`,
      },
      hourPrecipitation: mockPrecipitation,
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

export const successProviderPropsNoPrecipitation = {
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
      day: {
        tempHighLow: `H: 7°\u00A0\u00A0\u00A0\u00A0L: 4°`,
      },
      hourPrecipitation: mockPrecipitationWithNoPrecipitation,
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
