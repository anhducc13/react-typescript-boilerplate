import React from 'react';
import { Layout } from 'antd';
import { userHooks } from 'hooks';
import routes from 'routes';
import { IRoute } from 'interfaces';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import './AppLayout.scss';

const AppLayout: React.FC = () => {
  const { filteredNavigation, filteredRoutes } = userHooks.useAuthorizationData(
    routes as IRoute[]
  );

  return (
    <Layout className="app-layout">
      <AppSider filteredNavigation={filteredNavigation} />
      <Layout>
        <AppHeader />
        <AppContent filteredRoutes={filteredRoutes} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
