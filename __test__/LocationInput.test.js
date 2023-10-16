import { screen } from '@testing-library/react';
import { Location } from '../src/components/input/Location';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';

describe('Location', () => {
  //   it(`should render heading: ${nameHeading}`, () => {
  //     const heading = screen.getByRole('heading', {
  //       name: nameHeading,
  //     });
  //     expect(heading).toBeInTheDocument();
  //   });
  //   it('should render a label with text: "Location"', () => {
  //     renderComponent(Location);
  //     const label = screen.getByLabelText('Location');
  //     expect(label).toBeInTheDocument();
  //   });
  //   it('should render a button with text: "use location"', () => {
  //     renderComponent(Location);
  //     const button = screen.getByRole('button', { name: 'use location' });
  //     expect(button).toBeInTheDocument();
  //   });
  it('should render a button with text', () => {
    renderComponent(Location);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
