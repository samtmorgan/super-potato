import { render } from '@testing-library/react';
import React from 'react';
import { AppContext } from '../../src/context/AppContext';

// A custom render to setup providers. Extends regular
// render options with `providerProps` to allow injecting
// different scenarios to test with.
// @see https://testing-library.com/docs/react-testing-library/setup#custom-render
export function renderWithContext(ui, { providerProps, ...renderOptions }) {
  return render(<AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>, renderOptions);
}
