import TekoID from 'teko-oauth2';
import { browserHistory } from 'helpers';

const isLoggedIn = () => {
  return TekoID.user.isLoggedIn();
};

const login = () => {
  TekoID.user.login();
};

const logout = () => {
  // Tracking - Reset userId when logged out
  track('resetUserId');

  TekoID.user.logout(window.location.origin);
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
