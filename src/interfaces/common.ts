import { Locale } from 'antd/lib/locale-provider';

export interface IPermission {
  app: string;
  resource: string;
  action?: string;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  name: string;
  component: React.ReactType;
  permissions?: IPermission[];
  icon?: React.FunctionComponent<{ className?: string }>;
  children?: string[];
}

export interface IRegionItem {
  key: string;
  name: string;
  flag: string;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}
