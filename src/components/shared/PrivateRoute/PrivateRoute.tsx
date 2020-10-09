import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Spin } from 'antd';
import { userHooks } from 'hooks';
import { IRoute } from 'interfaces';
import { StoreContext } from 'contexts';

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  // Todo: Check if user is logged in or not

  // Fetch global data
  const { currentUser } = userHooks.useUserInfo();

  // Show spin when fetching required global data
  if (!currentUser) {
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
