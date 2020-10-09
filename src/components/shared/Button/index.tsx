import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button';
import { userHelpers } from 'helpers';
import { t } from 'helpers/i18n';

const { logout } = userHelpers;

export const BackToHomeButton: React.FC<ButtonProps> = () => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />}>
      {t('BackToHome')}
    </Button>
  </Link>
);

export const LogoutButton: React.FC<ButtonProps> = () => (
  <Button icon={<LogoutOutlined />} onClick={logout}>
    {t('Logout')}
  </Button>
);
