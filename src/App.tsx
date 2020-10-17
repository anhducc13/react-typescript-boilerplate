import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from 'helpers';
import { t } from 'helpers/i18n';
import './App.less';
import './App.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-crop/lib/ReactCrop.scss';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import Page500 from 'containers/shared/Page500';
import Login from 'containers/Login';
import PrivateRoute from 'components/shared/PrivateRoute';
import AppLayout from 'containers/AppLayout';

const App: React.FC = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/403" name="403" component={Page403} />
        <Route exact path="/404" name="404" component={Page404} />
        <Route exact path="/500" name="500" component={Page500} />
        <PrivateRoute path="/" name={t('Home')} component={AppLayout} />
      </Switch>
    </Router>
  );
};

export default App;
