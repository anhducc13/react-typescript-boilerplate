import TekoID from 'teko-oauth2';
import { browserHistory } from 'helpers';
import { LS_USER_ACCESS_TOKEN } from 'constants/index';

export const isLoggedIn = () => {
  return !!localStorage.getItem(LS_USER_ACCESS_TOKEN);
};

export const login = (params: any) => {
  const { username, password } = params;
  if (username === 'ductt' && password === 'ductt') {
    localStorage.setItem(LS_USER_ACCESS_TOKEN, 'ductt');
    return Promise.resolve({ success: true });
  } else {
    return Promise.reject(new Error('fail to login'));
  }
};

export const logout = () => {
  localStorage.removeItem(LS_USER_ACCESS_TOKEN);
};

const getAccessToken = () => {
  return TekoID.user.getAccessToken();
};

const getUserInfo = () => {
  return TekoID.user.getUserInfo();
};

const getFullUserInfo = async () => {
  const user = {
    sub: '1fe64ad88dd94f2788468034a5f5a9c3',
    name: 'Tran Tien Duc',
    picture:
      'https://lh4.googleusercontent.com/--XqQw4kYpN8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfrz5k23VcOKuCE6cbop4Ri6fhfuQ/photo.jpg',
    email: 'duc.tt@teko.vn',
    phone_number: '0362897165',
    address: null,
    birthday: null,
    roles: [],
    permissions: [],
    meta_data: { seller_id: '0' },
  };
  return Promise.resolve(user);
};

const denyAccess = () => {
  browserHistory.push('/403');
};

export default {
  isLoggedIn,
  login,
  logout,
  getAccessToken,
  getUserInfo,
  getFullUserInfo,
  denyAccess,
};
