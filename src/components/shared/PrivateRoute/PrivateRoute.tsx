import React from 'react';
import { Route } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { userHooks } from 'hooks';
import { IRoute } from 'interfaces';
import { StoreContext } from 'contexts';
import { browserHistory } from 'helpers';
import { isLoggedIn } from 'services';

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  // Fetch global data
  const { currentUser } = userHooks.useUserInfo();

  // Todo: Check if user is logged in or not
  if (!isLoggedIn()) {
    notification.error({
      message: 'Vui lòng đăng nhập để tiếp tục',
    });
    browserHistory.push('./login');
    return null;
  }
  if (!currentUser) {
    // Show spin when fetching required global data
    return <Spin className="app-spin" />;
  }

  return (
    <StoreContext.Provider
      value={{
        currentUser,
      }}
    >
      <Route {...rest} render={routeProps => <Component {...routeProps} />} />
    </StoreContext.Provider>
  );
};

export default PrivateRoute;
