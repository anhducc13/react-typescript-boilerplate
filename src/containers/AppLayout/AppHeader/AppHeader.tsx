import React, { useContext } from 'react';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Switch,
  Modal,
  notification,
} from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { localizationConstants } from 'constants/index';
import { browserHistory, localizationHelpers } from 'helpers';
import { t } from 'helpers/i18n';
import { IRegionItem } from 'interfaces';
import { StoreContext } from 'contexts';
import { useThemeSwitch } from 'hooks/theme';
import sunIcon from 'assets/images/sun.png';
import moonIcon from 'assets/images/moon.png';
import { logout } from 'services';

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

  const { isDarkMode, toggleDarkMode } = useThemeSwitch();

  return (
    <Header className="app-header">
      <Switch
        data-testid="theme-switch"
        className="theme-switch mx-base"
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

      <Dropdown overlay={localizationMenu} trigger={['click']}>
        <span className="app-user">
          <Avatar src={currentRegion && currentRegion.flag} shape="square" />
          <span className="name">{currentRegion && currentRegion.name}</span>
        </span>
      </Dropdown>

      <Dropdown overlay={userMenu} trigger={['click']}>
        <span className="app-user">
          <Avatar src={currentUser.picture} />
          <span className="name">{currentUser.name}</span>
          <DownOutlined />
        </span>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
