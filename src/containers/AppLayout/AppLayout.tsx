import React from 'react';
import { Layout, Col, Row } from 'antd';
import { userHooks } from 'hooks';
import routes from 'routes';
import { IRoute } from 'interfaces';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppSider from './AppSider';
import './AppLayout.scss';

const AppLayout: React.FC = () => {
  const { filteredRoutes } = userHooks.useAuthorizationData(routes as IRoute[]);

  return (
    <Layout className="app-layout">
      <Layout style={{ marginTop: 56 }}>
        <AppHeader filteredRoutes={filteredRoutes} />
        <Layout>
          <Row>
            <Col
              span={6}
              style={{
                backgroundColor: '#F0F2F5',
                height: '100vh',
                width: '100%',
                position: 'fixed',
              }}
            >
              <AppSider />
            </Col>
            <Col
              span={18}
              style={{
                marginLeft: '25%',
              }}
            >
              <AppContent filteredRoutes={filteredRoutes} />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
