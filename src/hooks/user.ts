import { useState, useEffect, useContext } from 'react';
import userHelpers from 'helpers/user';
import { userServices } from 'services';
import { IRoute } from 'interfaces';
import { StoreContext } from 'contexts';
import { browserHistory } from 'helpers';
import { notification } from 'antd';

const useUserInfo = () => {
  const [currentUser, setCurrentUser] = useState();

  const getFullUserInfo = async () => {
    try {
      const fullUserInfo = await userServices.getFullUserInfo();
      setCurrentUser(fullUserInfo);
    } catch {
      notification.error({
        message: 'Vui lòng đăng nhập để tiếp tục',
      });
      browserHistory.push('/login');
    }
  };

  useEffect(() => {
    getFullUserInfo();
  }, []);

  return { currentUser };
};

const useAuthorizationData = (items: IRoute[]) => {
  const { currentUser } = useContext(StoreContext);

  // Get navigation which match permissions to build menu
  const filteredNavigation = userHelpers.filterHasPermissions(
    items,
    currentUser.permissions
  );

  // Only get routes which is link to a component
  const filteredRoutes = filteredNavigation.filter(
    item => !item.children && item.component
  );

  return {
    filteredNavigation,
    filteredRoutes,
  };
};

export default {
  useUserInfo,
  useAuthorizationData,
};
