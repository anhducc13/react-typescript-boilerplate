import React, { useContext } from 'react';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  notification,
  Input,
  Row,
  Col,
} from 'antd';
import {
  LogoutOutlined,
  SearchOutlined,
  BookOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { localizationConstants } from 'constants/index';
import { browserHistory, localizationHelpers } from 'helpers';
import { t } from 'helpers/i18n';
import { IRegionItem, IRoute } from 'interfaces';
import { StoreContext } from 'contexts';
// import { useThemeSwitch } from 'hooks/theme';
// import sunIcon from 'assets/images/sun.png';
// import moonIcon from 'assets/images/moon.png';
import { logout } from 'services';
import { Link, useLocation } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';

const { Header } = Layout;
const { REGIONS } = localizationConstants;
const { getCurrentLanguage, changeLanguage } = localizationHelpers;

interface AppHeaderProps {
  filteredRoutes: IRoute[];
}

const AppHeader: React.FC<AppHeaderProps> = ({
  filteredRoutes,
}: AppHeaderProps) => {
  const { currentUser } = useContext(StoreContext);
  const location = useLocation();
  const { signOut } = useGoogleLogout({
    clientId:
      '335058615265-gcce2lv24jgadcjv20oblhlav3s0caik.apps.googleusercontent.com',
  });

  const handleLogout = () => {
    Modal.confirm({
      title: 'Bạn có muốn đăng xuất?',
      onOk: () => {
        signOut();
        logout();
        notification.success({
          message: 'Hẹn gặp lại',
        });
        browserHistory.push('/login');
      },
    });
  };

  const localizationMenu = (
    <Menu>
      {Object.values(REGIONS).map((el: IRegionItem) => (
        <Menu.Item key={el.key} onClick={() => changeLanguage(el.key)}>
          <Avatar src={el.flag} shape="square" />
          <span style={{ marginLeft: 10 }}>{el.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item data-testid="btn-logout" onClick={handleLogout}>
        <LogoutOutlined />
        <span>{t('Logout')}</span>
      </Menu.Item>
    </Menu>
  );

  const currentRegion = REGIONS[getCurrentLanguage()];

  const handleChange = (item: any) => {
    if (item.key !== location.pathname) {
      browserHistory.push(item.key);
    }
  };

  return (
    <Header className="app-header">
      <Row>
        <Col span={6}>
          <span className="d-flex app-user">
            <Link to="/" className="app-logo">
              <img
                src="https://qdiary.github.io/img/logo.462c0eef.png"
                className="logo align-self-center"
                alt="logo"
              />
            </Link>
            <Input
              placeholder="Tìm kiếm trên Memo"
              prefix={<SearchOutlined />}
              style={{
                borderRadius: 999,
                height: 40,
                marginTop: 8,
                marginLeft: 8,
              }}
            />
          </span>
        </Col>
        <Col span={12}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            onClick={handleChange}
            className="custom-ant-menu"
          >
            {filteredRoutes.map(item => {
              switch (item.path) {
                case '/timeline':
                  return (
                    <Menu.Item
                      key={item.path}
                      icon={<BookOutlined style={{ fontSize: 24 }} />}
                    >
                      {item.name}
                    </Menu.Item>
                  );
                case '/task':
                  return (
                    <Menu.Item
                      key={item.path}
                      icon={<ProfileOutlined style={{ fontSize: 24 }} />}
                    >
                      {item.name}
                    </Menu.Item>
                  );
                default:
                  return null;
              }
            })}
          </Menu>
        </Col>
        <Col span={6} className="d-flex justify-content-between">
          <Dropdown overlay={userMenu} trigger={['click']}>
            <span className="app-user">
              <Avatar src={currentUser.picture} />
              <span className="name">{currentUser.name}</span>
            </span>
          </Dropdown>
          <Dropdown overlay={localizationMenu} trigger={['click']}>
            <span className="app-user">
              <Avatar
                src={currentRegion && currentRegion.flag}
                shape="square"
              />
            </span>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
