import React from 'react';
import { t } from 'helpers/i18n';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';

const BrandDetail: React.FC = () => {
  return (
    <AppContainer title={t('BrandDetail')}>
      <ContentBlock>{t('BrandDetail')}</ContentBlock>
    </AppContainer>
  );
};

export default BrandDetail;
