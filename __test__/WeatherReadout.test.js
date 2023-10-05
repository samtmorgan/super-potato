import { screen } from '@testing-library/react';
import { WeatherReadout } from '../src/components/WeatherReadout';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';

describe('WeatherReadout', () => {
  it(`should render heading: Weather Readout`, () => {
    renderComponent(WeatherReadout);
    const heading = screen.getByRole('heading', {
      name: 'Weather Readout',
    });
    expect(heading).toBeInTheDocument();
  });
  it('should render a p with text: "Temperature"', () => {
    renderComponent(WeatherReadout);
    const p = screen.getByText('Temperature:loading...');
    expect(p).toBeInTheDocument();
  });
});