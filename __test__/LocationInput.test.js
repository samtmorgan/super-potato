import { screen } from '@testing-library/react';
import { LocationInput } from '../src/components/LocationInput';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';

describe('LocationInput', () => {
  //   it(`should render heading: ${nameHeading}`, () => {
  //     const heading = screen.getByRole('heading', {
  //       name: nameHeading,
  //     });
  //     expect(heading).toBeInTheDocument();
  //   });
  it('should render a label with text: "Location"', () => {
    renderComponent(LocationInput);
    const label = screen.getByLabelText('Location');
    expect(label).toBeInTheDocument();
  });
  it('should render a button with text: "use location"', () => {
    renderComponent(LocationInput);
    const button = screen.getByRole('button', { name: 'use location' });
    expect(button).toBeInTheDocument();
  });
});
