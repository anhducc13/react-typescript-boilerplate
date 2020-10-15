import React, { useState } from 'react';
import { Button, Col, DatePicker, Radio, Row } from 'antd';

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
            <Radio.Group className="option-filter" onChange={() => {}}>
              <Row>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={1}>
                    Hôm qua
                  </Radio>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Radio style={radioStyle} value={2}>
                    Hôm nay
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
            <RangePicker style={{ width: '100%' }} />
          </>
        )}
        {filterType === FILTER_TYPE.WEEK && (
          <DatePicker picker="week" style={{ width: '100%' }} />
        )}
        {filterType === FILTER_TYPE.MONTH && (
          <DatePicker picker="month" style={{ width: '100%' }} />
        )}
        {filterType === FILTER_TYPE.QUARTER && (
          <DatePicker picker="quarter" style={{ width: '100%' }} />
        )}
        {filterType === FILTER_TYPE.YEAR && (
          <DatePicker picker="year" style={{ width: '100%' }} />
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
