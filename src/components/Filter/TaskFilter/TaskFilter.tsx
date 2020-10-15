import React from 'react';
import {
  AccountBookOutlined,
  ExceptionOutlined,
  FireOutlined,
  FileSearchOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

const TimelineFilter = () => {
  return (
    <>
      <h4 className="sider-title">Nhiệm vụ</h4>
      <div className="item-group-task">
        <div className="list-item">
          <div className="list-item__content">
            <AccountBookOutlined style={{ fontSize: 24, marginRight: 20 }} />
            <div className="list-item__title">Hôm nay</div>
          </div>
        </div>
        <div className="list-item">
          <div className="list-item__content">
            <ExceptionOutlined style={{ fontSize: 24, marginRight: 20 }} />
            <div className="list-item__title">Nhiệm vụ đã quá hạn</div>
          </div>
        </div>
        <div className="list-item">
          <div className="list-item__content">
            <FireOutlined style={{ fontSize: 24, marginRight: 20 }} />
            <div className="list-item__title">Quan trọng</div>
          </div>
        </div>
        <div className="list-item">
          <div className="list-item__content">
            <FileSearchOutlined style={{ fontSize: 24, marginRight: 20 }} />
            <div className="list-item__title">Tương lai</div>
          </div>
        </div>
        <div className="list-item">
          <div className="list-item__content">
            <FileProtectOutlined style={{ fontSize: 24, marginRight: 20 }} />
            <div className="list-item__title">Đã hoàn thành</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineFilter;
