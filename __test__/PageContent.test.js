import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContent from '../src/components/PageContent';
import { AppContext } from '../src/context/AppContext';
import { DENIED, ERROR, NOT_INITIALIZED, SUCCESS } from '../src/constants/statuses';
import { pageContentError, pageContentNavDenied } from '../src/constants/copy';

// const initString = `Press use location to get the weather.`;

// A custom render to setup providers. Extends regular
// render options with `providerProps` to allow injecting
// different scenarios to test with.
// @see https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>, renderOptions);
};

describe('PageContent component should render appropriate status dependent the values in AppContext', () => {
  test('Loader is shown if locationStatus === NOT_INITIALIZED', () => {
    const providerProps = {
      value: { locationStatus: NOT_INITIALIZED },
    };
    customRender(<PageContent />, { providerProps });
    const loader = screen.getByTestId('three-dots-loading');
    expect(loader).toBeInTheDocument();
  });
  test('Error component is shown if locationStatus === ERROR', () => {
    const providerProps = {
      value: { locationStatus: ERROR },
    };
    customRender(<PageContent />, { providerProps });
    const error = screen.getByRole('alert', { value: pageContentError });
    expect(error).toBeInTheDocument();
  });
  test('Error component is shown if locationStatus === ERROR', () => {
    const providerProps = {
      value: { locationStatus: DENIED },
    };
    customRender(<PageContent />, { providerProps });
    const denied = screen.getByRole('alert', { value: pageContentNavDenied });
    expect(denied).toBeInTheDocument();
  });
  test('Render address', () => {
    const providerProps = {
      value: {
        locationStatus: SUCCESS,
        addressStatus: SUCCESS,
        weatherStatus: SUCCESS,
        address: 'here and now',
        weatherAssets: { current: { iconCode: 'test', temp: 18 } },
      },
    };
    customRender(<PageContent />, { providerProps });
    const address = screen.getByText('here and now');
    expect(address).toBeInTheDocument();
  });
  test('Render temperature', () => {
    const providerProps = {
      value: {
        locationStatus: SUCCESS,
        addressStatus: SUCCESS,
        weatherStatus: SUCCESS,
        address: 'here and now',
        weatherAssets: { current: { iconCode: 'test', temp: 18 } },
      },
    };
    customRender(<PageContent />, { providerProps });

    const address = screen.getByText('18');
    expect(address).toBeInTheDocument();
  });

  //     expect(heading).toBeInTheDocument();
  //   });
  //   it('should render a p with text: "Temperature"', () => {
  //     renderComponent(CurrentWeather);
  //     const p = screen.getByText('Temperature:loading...');
  //     expect(p).toBeInTheDocument();
  //   });

  //   it(`should render a p with text: ${initString}`, () => {
  //     renderComponent(CurrentWeather);
  //     const p = screen.getByText(initString);
  //     expect(p).toBeInTheDocument();
  //   });
});
