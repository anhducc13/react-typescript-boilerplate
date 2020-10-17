import React from 'react';
import { Card, Tooltip } from 'antd';
import {
  FieldTimeOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import style from '@emotion/styled';
import moment from 'moment';
import Slider from 'react-slick';

const StyledCard = style(Card)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.08);
  padding: 12px 14px;
  margin: 15px 0;

  .ant-card-head {
    padding: 0;
    min-height: unset;

    .ant-card-head-title {
      padding: 0;
    }
  }

  .ant-card-body {
    padding: 12px 0;
  }

  .ant-card-actions > li {
    margin: 4px 0 0;
  }
`;

const StyledTitle = style.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const StyledTime = style.div`
  margin-top: -6px;
  margin-bottom: 6px;

  .anticon {
    vertical-align: 0;
  }
`;

const StyledDisplayTime = style.span`
  font-size: 12px;
  margin-left: 4px;
`;

const StyledContent = style.div`
  margin-bottom: 10px;
`;

const StyledSlider = style(Slider)`
  img {
    display: block;
    margin: auto;
  }
  video {
    display: block;
    margin: auto;
    min-width: 80%;
  }
`;

const PostItem = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: 'auto',
    arrows: false,
  };
  const renderedTitle = (
    <div>
      <StyledTitle>Chủ nhật không được nhậu?</StyledTitle>
      <StyledTime>
        <FieldTimeOutlined />
        <StyledDisplayTime>
          {moment()
            .add(-1, 'minutes')
            .fromNow()}
        </StyledDisplayTime>
      </StyledTime>
    </div>
  );
  return (
    <StyledCard
      title={renderedTitle}
      actions={[
        <Tooltip title="Chia sẻ" placement="bottom">
          <SendOutlined key="send" />
        </Tooltip>,
        <Tooltip title="Chỉnh sửa" placement="bottom">
          <EditOutlined key="edit" />
        </Tooltip>,
        <Tooltip title="Xóa" placement="bottom">
          <DeleteOutlined key="delete" />
        </Tooltip>,
      ]}
    >
      <StyledContent>Gọi anh em mấy tuần rồi không được</StyledContent>
      <StyledSlider {...settings}>
        <div>
          <img
            alt="ductt"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          />
        </div>
        <div>
          <img
            alt="ductt"
            src="https://image2.baonghean.vn/w607/Uploaded/2020/reeaekxlxk/2018_01_04/34617298_412018.jpg"
          />
        </div>
        <div>
          <video controls>
            <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
        </div>
      </StyledSlider>
    </StyledCard>
  );
};

export default PostItem;
