import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { userServices } from 'services';
import { enable, disable } from 'darkreader';
import App from './App';

describe('user has not logged in yet', () => {
  jest.spyOn(userServices, 'isLoggedIn').mockReturnValueOnce(false);

  // Smoke testing (no assertions)
  it('renders correctly', () => {
    render(<App />);
  });
});

describe('user has already logged in', () => {
  it('renders correctly', () => {
    render(<App />);
  });

  it('clicks logout on header', async () => {
    const logoutMock = jest.spyOn(userServices, 'logout');
    const { getByTestId } = render(<App />);
    await wait(() => {
      fireEvent.click(getByTestId('btn-logout'));
    });
    expect(logoutMock).toHaveBeenCalled();
  });

  it('clicks toggle sidebar', async () => {
    const { getByTestId } = render(<App />);
    await wait(() => {
      fireEvent.click(getByTestId('menu-collapse-icon'));
    });
    expect(getByTestId('menu-expand-icon')).toBeInTheDocument();
  });
});

describe('user toggles dark mode', () => {
  it('works correctly', async () => {
    const { getByTestId } = render(<App />);

    await wait(() => {
      fireEvent.click(getByTestId('theme-switch'));
    });

    expect(enable).toHaveBeenCalled();

    await wait(() => {
      fireEvent.click(getByTestId('theme-switch'));
    });

    expect(disable).toHaveBeenCalled();
  });
});
