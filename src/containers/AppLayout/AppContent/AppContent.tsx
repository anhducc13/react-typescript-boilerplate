import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { IRoute } from 'interfaces';

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

const AppContent: React.FC<AppContentProps> = props => {
  const { filteredRoutes } = props;

  return (
    <Content className="app-content">
      <Suspense fallback={null}>
        <Switch>
          {filteredRoutes.map(({ component: Component, ...rest }) => {
            return (
              <Route
                {...rest}
                key={uuidv4()}
                render={routeProps => {
                  return (
                    <>
                      <Component {...routeProps} />
                    </>
                  );
                }}
              />
            );
          })}
          <Redirect from="/" to="/timeline" />
          <Redirect from="*" to="/404" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
