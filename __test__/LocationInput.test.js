import React from 'react';
import { screen } from '@testing-library/react';
import { DENIED, LOADING } from '@/constants/statuses';
import { LocationInput } from '../src/components/input/LocationInput';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';
import { renderWithContext } from './utils/renderWithContext';

describe('Location', () => {
  it('should render an input with label "search"', () => {
    renderComponent(LocationInput);
    const textbox = screen.getByRole('textbox', { name: 'Search' });
    expect(textbox).toBeInTheDocument();
  });
  it('Should render a button with text label "get location"', () => {
    renderComponent(LocationInput);
    const button = screen.getByRole('button', { name: 'get location' });
    expect(button).toBeInTheDocument();
  });
  test('"get location" button is disabled if location is in loading state', () => {
    const providerProps = {
      value: { locationStatus: LOADING, setSearchResults: () => {} },
    };
    renderWithContext(<LocationInput />, { providerProps });
    const button = screen.getByRole('button', { name: 'get location' });
    expect(button).toBeDisabled();
  });
  test('"get location" button is disabled if location is in disabled state', () => {
    const providerProps = {
      value: { locationStatus: DENIED, setSearchResults: () => {} },
    };
    renderWithContext(<LocationInput />, { providerProps });
    const button = screen.getByRole('button', { name: 'get location' });
    expect(button).toBeDisabled();
  });
});
