import { lazy } from 'react';
import { t } from 'helpers/i18n';

const Timeline = lazy(() => import('containers/Timeline'));
const Task = lazy(() => import('containers/Task'));

/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */
const routes = [
  // This is a menu/route which has no children (sub-menu)
  {
    exact: true,
    path: '/timeline',
    name: t('Timeline'),
    component: Timeline,
  },
  {
    exact: true,
    path: '/task',
    name: t('Task'),
    component: Task,
  },
];

export default routes;
