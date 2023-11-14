import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithContext, successProviderProps } from './utils/renderWithContext';
import { DayTempRange } from '../src/components/DayTempRange';

describe('the low and high temperatures are rendered', () => {
  beforeEach(() => {
    const providerProps = successProviderProps;
    renderWithContext(<DayTempRange />, { providerProps });
  });
  test('the low and high temperatures section is rendered', () => {
    const section = screen.getByLabelText('Daily low and high temperatures');
    expect(section).toBeInTheDocument();
  });
  test('the low temperature is rendered', () => {
    const minTemp = screen.getByText(/L: 4°/);
    expect(minTemp).toBeInTheDocument();
  });
  test('the high temperature is rendered', () => {
    const maxTemp = screen.getByText(/H: 7°/);
    expect(maxTemp).toBeInTheDocument();
  });
});
