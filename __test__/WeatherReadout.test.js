import { screen } from '@testing-library/react';
import { WeatherReadout } from '../src/components/WeatherReadout';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';

const initString = `Press use location to get the weather.`;

describe('WeatherReadout', () => {
  //   it(`should render heading: Weather Readout`, () => {
  //     renderComponent(WeatherReadout);
  //     const heading = screen.getByRole('heading', {
  //       name: 'Weather Readout',
  //     });
  //     expect(heading).toBeInTheDocument();
  //   });
  //   it('should render a p with text: "Temperature"', () => {
  //     renderComponent(WeatherReadout);
  //     const p = screen.getByText('Temperature:loading...');
  //     expect(p).toBeInTheDocument();
  //   });

  it(`should render a p with text: ${initString}`, () => {
    renderComponent(WeatherReadout);
    const p = screen.getByText(initString);
    expect(p).toBeInTheDocument();
  });
});
