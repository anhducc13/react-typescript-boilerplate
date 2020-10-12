import React from 'react';
import { Form, Input, Button, Row, notification } from 'antd';
import styled from '@emotion/styled';
import { isLoggedIn, login } from 'services';
import { browserHistory } from 'helpers';

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
  if (isLoggedIn()) {
    browserHistory.push('/');
  }

  const handleLogin = async (values: any) => {
    try {
      await login(values);
      notification.success({
        message: 'Chào mừng trở lại',
      });
      browserHistory.push('/');
    } catch {
      notification.error({
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    }
  };
  return (
    <FormWrapper>
      <StyledLogo>
        <img alt="Logo" src="./favicon.png" />
        <span>Ductt Site</span>
      </StyledLogo>
      <Form onFinish={handleLogin}>
        <FormItem name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </FormItem>
        <FormItem name="password" rules={[{ required: true }]}>
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
