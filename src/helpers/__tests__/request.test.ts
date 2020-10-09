import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestHelpers } from 'helpers';
import { userServices } from 'services';

const { handleResponseError } = requestHelpers;

describe('test handleResponseError', () => {
  it('calls userServices.logout when 401', () => {
    const logoutMock = jest.spyOn(userServices, 'logout');
    const responseError = { response: { status: 401 } } as AxiosError;
    handleResponseError(responseError);
    expect(logoutMock).toHaveBeenCalled();
  });

  it('calls userServices.denyAccess when 403', () => {
    const denyAccessMock = jest.spyOn(userServices, 'denyAccess');
    const responseError = { response: { status: 403 } } as AxiosError;
    handleResponseError(responseError);
    expect(denyAccessMock).toHaveBeenCalled();
  });

  it('shows error notification on general error', () => {
    const notificationErrorMock = jest.spyOn(notification, 'error');
    const responseError = {
      response: {
        status: 400,
        data: { code: 'INVALID', message: 'Dữ liệu không hợp lệ' },
      },
    } as AxiosError;
    handleResponseError(responseError);
    expect(notificationErrorMock).toHaveBeenCalled();
  });
});
