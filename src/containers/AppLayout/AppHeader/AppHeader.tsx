import React, { useContext } from 'react';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  // Switch,
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
import { IRegionItem } from 'interfaces';
import { StoreContext } from 'contexts';
// import { useThemeSwitch } from 'hooks/theme';
// import sunIcon from 'assets/images/sun.png';
// import moonIcon from 'assets/images/moon.png';
import { logout } from 'services';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { REGIONS } = localizationConstants;
const { getCurrentLanguage, changeLanguage } = localizationHelpers;

const AppHeader: React.FC = () => {
  const { currentUser } = useContext(StoreContext);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Bạn có muốn đăng xuất?',
      onOk: () => {
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

  // const { isDarkMode, toggleDarkMode } = useThemeSwitch();

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
            defaultSelectedKeys={['1']}
            className="custom-ant-menu"
          >
            <Menu.Item key="1" icon={<BookOutlined style={{ fontSize: 24 }} />}>
              Nhật ký
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ProfileOutlined style={{ fontSize: 24 }} />}
            >
              Nhiệm vụ
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={6} className="d-flex justify-content-between">
          {/* <span className="app-user">
            <Switch
              data-testid="theme-switch"
              className="theme-switch"
              title={t('SwitchTheme')}
              checked={isDarkMode}
              checkedChildren={
                <img width="16" height="16" src={moonIcon} alt="dark" />
              }
              unCheckedChildren={
                <img width="16" height="16" src={sunIcon} alt="light" />
              }
              onClick={toggleDarkMode}
            />
          </span> */}

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
