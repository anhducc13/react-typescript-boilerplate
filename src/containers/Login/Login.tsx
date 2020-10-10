import React from 'react';
import { Form, Input, Button, Row } from 'antd';
import styled from '@emotion/styled';

const FormItem = Form.Item;

const FormWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 320px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }

  p {
    color: rgb(204, 204, 204);
    text-align: center;
    margin-top: 16px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledLogo = styled.div`
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 25px;
    margin-right: 8px;
  }

  span {
    vertical-align: text-bottom;
    font-size: 16px;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 700;
    color: #eb1f3a;
  }
`;

const Login = () => {
  return (
    <FormWrapper>
      <StyledLogo>
        <img alt="Logo" src="./favicon.png" />
        <span>Ductt Site</span>
      </StyledLogo>
      <Form onFinish={() => {}}>
        <FormItem name="username" rules={[{ required: true }]} hasFeedback>
          <Input placeholder="Username" />
        </FormItem>
        <FormItem name="password" rules={[{ required: true }]} hasFeedback>
          <Input type="password" placeholder="Password" />
        </FormItem>
        <Row>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Row>
      </Form>
    </FormWrapper>
  );
};

export default Login;
