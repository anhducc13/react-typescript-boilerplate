import React from 'react';
import { render } from '@testing-library/react';
import BrandDetail from './BrandDetail';

it('renders correctly', () => {
  const { container } = render(<BrandDetail />);
  expect(container.firstChild).toMatchSnapshot();
});
