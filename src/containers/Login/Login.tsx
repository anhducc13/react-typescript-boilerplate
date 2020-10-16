import React from 'react';
import { notification } from 'antd';
import styled from '@emotion/styled';
import { isLoggedIn } from 'services';
import { browserHistory } from 'helpers';
import { GoogleLogin } from 'react-google-login';
import { LS_USER_ACCESS_TOKEN } from 'constants/index';

const FormWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 160px;
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

  const handleLoginGoogle = (returnObj: any) => {
    localStorage.setItem(LS_USER_ACCESS_TOKEN, returnObj.tokenId);
    notification.success({
      message: 'Xin chào',
    });
    browserHistory.push('/');
  };
  return (
    <FormWrapper>
      <StyledLogo>
        <img alt="Logo" src="https://qdiary.github.io/img/logo.462c0eef.png" />
        <span>MEMO</span>
      </StyledLogo>
      <GoogleLogin
        clientId="335058615265-gcce2lv24jgadcjv20oblhlav3s0caik.apps.googleusercontent.com"
        onSuccess={handleLoginGoogle}
        onFailure={() => {
          notification.error({
            message: 'Có lỗi xảy ra, vui lòng thử lại sau!',
          });
        }}
        responseType="id_token"
        cookiePolicy={'single_host_origin'}
      />
    </FormWrapper>
  );
};

export default Login;
