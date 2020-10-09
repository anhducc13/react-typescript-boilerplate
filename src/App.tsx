import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import TekoID from 'teko-oauth2';
import ReactTracker from 'react-tracker-teko';
import { commonConstants } from 'constants/index';
import { browserHistory } from 'helpers';
import { t } from 'helpers/i18n';
import './App.less';
import './App.scss';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import Page500 from 'containers/shared/Page500';
import PrivateRoute from 'components/shared/PrivateRoute';
import AppLayout from 'containers/AppLayout';

const { iam, tracker } = window.config;

const { IAM_SCOPES } = commonConstants;

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: (tracker.appId && tracker.host) || '',
  urlServeJsFile: (tracker.appId && tracker.jsFile) || '',
  appId: tracker.appId || '',
});

const App: React.FC = () => {
  const [loading] = useState(false);

  return loading ? (
    <Spin className="app-spin" />
  ) : (
    <Router history={reactTracker.connectToHistory(browserHistory)}>
      <Switch>
        <Route exact path="/403" name="403" component={Page403} />
        <Route exact path="/404" name="404" component={Page404} />
        <Route exact path="/500" name="500" component={Page500} />
        <PrivateRoute path="/" name={t('Home')} component={AppLayout} />
      </Switch>
    </Router>
  );
};

export default App;
