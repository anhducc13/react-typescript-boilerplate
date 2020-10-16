import React, { useState } from 'react';
import { Button, Col, DatePicker, Radio, Row } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const FILTER_TYPE = {
  RANGE: 'range',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const TimelineFilter = () => {
  const [filterType, setFilterType] = useState(FILTER_TYPE.RANGE);
  const [value, setValue] = useState<any>();

  const handleChangeSubFilter = (e: any) => {
    console.log(e.target.value);
    const newValue = e.target.value;
    switch (newValue) {
      case 1:
        setValue([moment(), moment()]);
        break;
      default:
        setValue([undefined, undefined]);
    }
  };

  return (
    <>
      <h4 className="sider-title">Dòng thời gian</h4>
      <div className="block-filter">
        <Radio.Group
          className="option-filter"
          onChange={e => setFilterType(e.target.value)}
          value={filterType}
          buttonStyle="solid"
        >
          <Radio.Button value={FILTER_TYPE.RANGE}>Khoảng</Radio.Button>
          <Radio.Button value={FILTER_TYPE.WEEK}>Tuần</Radio.Button>
          <Radio.Button value={FILTER_TYPE.MONTH}>Tháng</Radio.Button>
          <Radio.Button value={FILTER_TYPE.QUARTER}>Quý</Radio.Button>
          <Radio.Button value={FILTER_TYPE.YEAR}>Năm</Radio.Button>
        </Radio.Group>
        {filterType === FILTER_TYPE.RANGE && (
          <>
            <Radio.Group
              className="option-filter"
              onChange={handleChangeSubFilter}
            >
              <Row>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={1}>
                    Hôm nay
                  </Radio>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={2}>
                    Hôm qua
                  </Radio>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={3}>
                    1 tuần trước
                  </Radio>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={4}>
                    1 tháng trước
                  </Radio>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={5}>
                    3 tháng trước
                  </Radio>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={6}>
                    1 năm trước
                  </Radio>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={7}>
                    Tùy biến
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
            <RangePicker value={value} style={{ width: '100%' }} />
          </>
        )}
        {filterType === FILTER_TYPE.WEEK && (
          <DatePicker value={value} picker="week" style={{ width: '100%' }} />
        )}
        {filterType === FILTER_TYPE.MONTH && (
          <DatePicker value={value} picker="month" style={{ width: '100%' }} />
        )}
        {filterType === FILTER_TYPE.QUARTER && (
          <DatePicker
            value={value}
            picker="quarter"
            style={{ width: '100%' }}
          />
        )}
        {filterType === FILTER_TYPE.YEAR && (
          <DatePicker value={value} picker="year" style={{ width: '100%' }} />
        )}
        <div className="btn-group">
          <Button className="mr-3" type="primary">
            Áp dụng
          </Button>
          <Button>Đặt lại</Button>
        </div>
      </div>
    </>
  );
};

export default TimelineFilter;
