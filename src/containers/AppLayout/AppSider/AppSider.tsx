import React from 'react';
// import TimelineFilter from 'components/Filter/TimelineFilter';
import TaskFilter from 'components/Filter/TaskFilter';

const AppSider = () => {
  return (
    <div className="app-sider">
      {/*<TimelineFilter />*/}
      <TaskFilter />
    </div>
  );
};

export default AppSider;
