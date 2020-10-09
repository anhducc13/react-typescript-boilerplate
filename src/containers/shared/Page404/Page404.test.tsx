import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Page404 from './Page404';

it('renders correctly', () => {
  render(
    <Router>
      <Page404 />
    </Router>
  );
});
