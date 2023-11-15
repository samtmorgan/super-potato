import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HourPrecipitation } from '../src/components/HourPrecipitation';
import {
  renderWithContext,
  successProviderProps,
  successProviderPropsNoPrecipitation,
} from './utils/renderWithContext';

describe('placeholders are rendered', () => {
  test('if no data an empty section is rendered', () => {
    render(<HourPrecipitation />);
    const section = screen.getByLabelText('rain in the next hour has no data');
    expect(section).toBeInTheDocument();
  });
  test('if the is no rain forecast for the hour, a section with a title is rendered', () => {
    const providerProps = successProviderPropsNoPrecipitation;
    renderWithContext(<HourPrecipitation />, { providerProps });
    const section = screen.getByText('No rain forecast for the hour');
    expect(section).toBeInTheDocument();
  });
});

describe('hour precipitation components are rendered', () => {
  beforeEach(() => {
    const providerProps = successProviderProps;
    renderWithContext(<HourPrecipitation />, { providerProps });
  });
  test('the hour precipitation section is rendered', () => {
    const section = screen.getByLabelText('Hour precipitation');
    expect(section).toBeInTheDocument();
  });
  test('the hour precipitation chart is rendered', () => {
    const section = screen.getByLabelText('precipitation chart');
    expect(section).toBeInTheDocument();
  });
  test('the hour precipitation chart has a title', () => {
    const section = screen.getByText('Rain Forecast');
    expect(section).toBeInTheDocument();
  });
});
