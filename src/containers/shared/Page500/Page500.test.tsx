import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Page500 from './Page500';

it('renders correctly', () => {
  render(
    <Router>
      <Page500 />
    </Router>
  );
});
