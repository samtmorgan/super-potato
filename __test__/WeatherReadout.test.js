import { screen } from '@testing-library/react';
import { WeatherReadout } from '../src/components/WeatherReadout';
import '@testing-library/jest-dom';
import { renderComponent } from './utils/renderComponent';

// const initString = `Press use location to get the weather.`;

describe('Current weather conditions', () => {
  it(`should render heading: Current weather conditions`, () => {
    renderComponent(WeatherReadout);
    const section = screen.getByLabelText('Current weather conditions');
    expect(section).toBeInTheDocument();
  });
  //     expect(heading).toBeInTheDocument();
  //   });
  //   it('should render a p with text: "Temperature"', () => {
  //     renderComponent(WeatherReadout);
  //     const p = screen.getByText('Temperature:loading...');
  //     expect(p).toBeInTheDocument();
  //   });

  //   it(`should render a p with text: ${initString}`, () => {
  //     renderComponent(WeatherReadout);
  //     const p = screen.getByText(initString);
  //     expect(p).toBeInTheDocument();
  //   });
});
