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
});

describe('PageContent includes Alert component if alerts is not null', () => {
  test('Component renders if alerts !== null', () => {
    // setup the context values as if all API requests were successful
    const providerProps = successProviderProps;
    // inject our test weather alert event
    providerProps.value.weatherAssets = {
      current: providerProps.value.weatherAssets.current,
      alerts: [{ event: 'yellow rain warning' }],
    };
    renderWithContext(<PageContent />, { providerProps });
    const alerts = screen.getByTestId('alerts');
    expect(alerts).toBeInTheDocument();
  });
  test('Component renders the multiple alert event text', () => {
    // setup the context values as if all API requests were successful
    const providerProps = successProviderProps;
    // inject our test weather alert event
    providerProps.value.weatherAssets = {
      current: providerProps.value.weatherAssets.current,
      alerts: [{ event: 'yellow rain warning 1' }, { event: 'yellow rain warning 2' }],
    };
    renderWithContext(<PageContent />, { providerProps });
    const alert1 = screen.getByText('yellow rain warning 1');
    const alert2 = screen.getByText('yellow rain warning 2');
    expect(alert1).toBeInTheDocument();
    expect(alert2).toBeInTheDocument();
  });
});

describe('the low and high temperatures are rendered', () => {
  beforeEach(() => {
    const providerProps = successProviderProps;
    renderWithContext(<PageContent />, { providerProps });
  });
  test('the low and high temperatures section is rendered', () => {
    const section = screen.getByLabelText('Daily low and high temperatures');
    expect(section).toBeInTheDocument();
  });
  // TODO: resolve why these don't work here but do work in the component test
  //   test('the low temperature is rendered', () => {
  //     const minTemp = screen.getByText(/L: 4°/);
  //     expect(minTemp).toBeInTheDocument();
  //   });
  //   test('the high temperature is rendered', async () => {
  //     const maxTemp = waitFor(screen.getByText(/H: 7°/));
  //     expect(maxTemp).toBeInTheDocument();
  //   });
});
