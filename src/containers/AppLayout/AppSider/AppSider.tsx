import React from 'react';
import TimelineFilter from 'components/Filter/TimelineFilter';
import TaskFilter from 'components/Filter/TaskFilter';
import { useLocation } from 'react-router';

const AppSider = () => {
  const location = useLocation();
  return (
    <div className="app-sider">
      {location.pathname === '/timeline' && <TimelineFilter />}
      {location.pathname === '/task' && <TaskFilter />}
    </div>
  );
};

export default AppSider;
