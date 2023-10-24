import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContent from '../src/components/PageContent';
import { DENIED, ERROR, LOADING } from '../src/constants/statuses';
import { pageContentError, pageContentNavDenied } from '../src/constants/copy';
import { renderComponent } from './utils/renderComponent';
import { renderWithContext, successProviderProps } from './utils/renderWithContext';

describe('PageContent component should render appropriate status dependent the values in AppContext', () => {
  test('Loader is shown in default context state', () => {
    renderComponent(PageContent);
    const loader = screen.getByTestId('three-dots-loading');
    expect(loader).toBeInTheDocument();
  });
  test('Loader is shown if locationStatus === LOADING', () => {
    const providerProps = {
      value: { locationStatus: LOADING, setSearchResults: () => {} },
    };
    renderWithContext(<PageContent />, { providerProps });
    const loader = screen.getByTestId('three-dots-loading');
    expect(loader).toBeInTheDocument();
  });
  test('Error component is shown if locationStatus === ERROR', () => {
    const providerProps = {
      value: { locationStatus: ERROR, setSearchResults: () => {} },
    };
    renderWithContext(<PageContent />, { providerProps });
    const error = screen.getByRole('alert', { value: pageContentError });
    expect(error).toBeInTheDocument();
  });
  test('Error component is shown if locationStatus === DENIED', () => {
    const providerProps = {
      value: { locationStatus: DENIED, setSearchResults: () => {} },
    };
    renderWithContext(<PageContent />, { providerProps });
    const denied = screen.getByRole('alert', { value: pageContentNavDenied });
    expect(denied).toBeInTheDocument();
  });
  //   test('Render address', () => {
  //     const providerProps = {
  //       value: {
  //         locationStatus: SUCCESS,
  //         addressStatus: SUCCESS,
  //         weatherStatus: SUCCESS,
  //         address: 'here and now',
  //         weatherAssets: { current: { iconCode: 'test', temp: 18 } },
  //       },
  //     };
  //     renderWithContext(<PageContent />, { providerProps });
  //     const address = screen.getByText('here and now');
  //     expect(address).toBeInTheDocument();
  //   });
  //   test('Render temperature', () => {
  //     const providerProps = {
  //       value: {
  //         locationStatus: SUCCESS,
  //         addressStatus: SUCCESS,
  //         weatherStatus: SUCCESS,
  //         address: 'here and now',
  //         weatherAssets: { current: { iconCode: 'test', temp: 18 } },
  //       },
  //     };
  //     renderWithContext(<PageContent />, { providerProps });
  //     const address = screen.getByText('18');
  //     expect(address).toBeInTheDocument();
  //   });
});

describe('PageContent includes Alert component if alerts is not null', () => {
  test('Component renders if alerts !== null', () => {
    const providerProps = successProviderProps;

    providerProps.value.weatherAssets = { current: providerProps.value.weatherAssets.current, alerts: [] };

    renderWithContext(<PageContent />, { providerProps });
    const alerts = screen.getByTestId('alerts');
    expect(alerts).toBeInTheDocument();
  });
  //   test('Error component is shown if locationStatus === ERROR', () => {
  //     const providerProps = {
  //       value: { locationStatus: ERROR, setSearchResults: () => {} },
  //     };
  //     renderWithContext(<PageContent />, { providerProps });
  //     const error = screen.getByRole('alert', { value: pageContentError });
  //     expect(error).toBeInTheDocument();
  //   });
  //   test('Error component is shown if locationStatus === DENIED', () => {
  //     const providerProps = {
  //       value: { locationStatus: DENIED, setSearchResults: () => {} },
  //     };
  //     renderWithContext(<PageContent />, { providerProps });
  //     const denied = screen.getByRole('alert', { value: pageContentNavDenied });
  //     expect(denied).toBeInTheDocument();
  //   });
  //   //   test('Render address', () => {
  //   //     const providerProps = {
  //   //       value: {
  //   //         locationStatus: SUCCESS,
  //   //         addressStatus: SUCCESS,
  //   //         weatherStatus: SUCCESS,
  //   //         address: 'here and now',
  //   //         weatherAssets: { current: { iconCode: 'test', temp: 18 } },
  //   //       },
  //   //     };
  //   //     renderWithContext(<PageContent />, { providerProps });
  //   //     const address = screen.getByText('here and now');
  //   //     expect(address).toBeInTheDocument();
  //   //   });
  //   //   test('Render temperature', () => {
  //   //     const providerProps = {
  //   //       value: {
  //   //         locationStatus: SUCCESS,
  //   //         addressStatus: SUCCESS,
  //   //         weatherStatus: SUCCESS,
  //   //         address: 'here and now',
  //   //         weatherAssets: { current: { iconCode: 'test', temp: 18 } },
  //   //       },
  //   //     };
  //   //     renderWithContext(<PageContent />, { providerProps });
  //   //     const address = screen.getByText('18');
  //   //     expect(address).toBeInTheDocument();
  //   //   });
});
