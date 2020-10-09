import React from 'react';
import { render, wait, fireEvent, RenderResult } from '@testing-library/react';
import BrandList from './BrandList';
import { BrowserRouter as Router } from 'react-router-dom';
import { itJira } from 'services/jira';
import { brandServices } from 'services';

let container: RenderResult['container'];
let getByTestId: RenderResult['getByTestId'];
let getBrandsMock: object;

beforeEach(() => {
  getBrandsMock = jest.spyOn(brandServices, 'getBrands');
  ({ container, getByTestId } = render(
    <Router>
      <BrandList />
    </Router>
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders correctly', () => {
  expect(container.firstChild).toMatchSnapshot();
});

describe('SCFW-155 - Brand list', () => {
  const ISSUE_KEY = 'SCFW-155';

  itJira(ISSUE_KEY, 'filters by name', async () => {
    const dummyText = 'abc';
    fireEvent.change(getByTestId('query'), { target: { value: dummyText } });
    fireEvent.submit(getByTestId('form-filter'));
    await wait(() => {
      const params = {
        page: 1,
        pageSize: 10,
        query: dummyText,
      };
      expect(getBrandsMock).toHaveBeenCalledWith(params);
    });
  });

  itJira(ISSUE_KEY, 'filters by status', async () => {
    const dummyStatus = '1';
    fireEvent.change(getByTestId('isActive'), {
      target: { value: dummyStatus },
    });
    fireEvent.submit(getByTestId('form-filter'));
    await wait(() => {
      const params = {
        page: 1,
        pageSize: 10,
        isActive: dummyStatus,
      };
      expect(getBrandsMock).toHaveBeenCalledWith(params);
    });
  });

  itJira(ISSUE_KEY, 'goes to other page', async () => {
    const dummyPage = 2;
    fireEvent.change(getByTestId('table-changer'), {
      target: {
        value: 1,
        payload: {
          pagination: { current: dummyPage, pageSize: 10 },
        },
      },
    });
    await wait(() => {
      const params = {
        page: dummyPage,
        pageSize: 10,
      };
      expect(getBrandsMock).toHaveBeenCalledWith(params);
    });
  });
});
