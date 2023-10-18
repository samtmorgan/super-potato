import React from 'react';
import { render } from '@testing-library/react';

export function renderComponent(Component) {
  return render(<Component />);
}
