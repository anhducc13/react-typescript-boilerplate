import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { IRoute } from 'interfaces';
import { commonHooks } from 'hooks';
import { commonConstants } from 'constants/index';
import logo from 'assets/images/logo.png';

const { Sider, Footer } = Layout;
const { SubMenu } = Menu;
const { TABLET_WIDTH } = commonConstants;
const { useAppMenu, useWindowDimensions } = commonHooks;

interface AppSiderProps {
  filteredNavigation: IRoute[];
}

let autoCollapse = true;

const AppSider: React.FC<AppSiderProps> = props => {
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation } = props;

  const { selectedKey, openKey } = useAppMenu(filteredNavigation);
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    autoCollapse = false;
    setCollapsed(collapsed => !collapsed);
  };

  useEffect(() => {
    if (autoCollapse) {
      setCollapsed(width <= TABLET_WIDTH);
    }
  }, [width]);

  return (
    <Sider
      className={classNames({
        'app-sider': true,
        collapsed: collapsed,
      })}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      {collapsed ? (
        <MenuUnfoldOutlined
          data-testid="menu-expand-icon"
          className="app-icon app-trigger"
          onClick={toggle}
        />
      ) : (
        <MenuFoldOutlined
          data-testid="menu-collapse-icon"
          className="app-icon app-trigger"
          onClick={toggle}
        />
      )}

      <div className="app-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <Menu
        className="app-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
      >
        {filteredNavigation.map(item => {
          if (!item.icon) return null;
          if (!item.children) {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <item.icon className="app-icon" />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            const { children } = item;
            const childs = filteredNavigation.filter(
              child => children.includes(child.path) && !child.children
            );
            return (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {childs.map(child => {
                  return (
                    <Menu.Item key={child.path}>
                      <Link to={child.path}>{child.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>

      {!collapsed && (
        <Footer className="app-footer">
          Teko Admin Boilerplate © {process.env.REACT_APP_VERSION}
        </Footer>
      )}
    </Sider>
  );
};

export default AppSider;
