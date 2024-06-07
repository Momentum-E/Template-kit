import { Card } from '@/components/shared';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DistanceTravelledChart from './charts/DistanceTravelledChart';

const DistanceTravelled = () => {
  const { t } = useTranslation('common');
  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>Usage</Card.Title>
        </Card.Header>
        <div className="flex justify-evenly border">
          <DistanceTravelledChart />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly">
            <div className="mb-2">
              <Card.Description>{t('Avg Daily Km Driven')}</Card.Description>
              <Card.Description>{t('78 km')}</Card.Description>
            </div>
            <div>
              <Card.Description>{t('Temperature Low/High')}</Card.Description>
              <Card.Description>{t('28\u00B0C / 34\u00B0C')}</Card.Description>
            </div>
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="mb-2">
              <Card.Description>{t('SOC Range')}</Card.Description>
              <Card.Description>{t('30% - 95%')}</Card.Description>
            </div>
            <div>
              <Card.Description>{t('Range Observed Min/Max')}</Card.Description>
              <Card.Description>{t('87 km / 110 km')}</Card.Description>
            </div>
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="mb-2">
              <Card.Description>{t('Real Range Observed')}</Card.Description>
              <Card.Description>{t('90 km')}</Card.Description>
            </div>
            <div>
              <Card.Description>
                {t('Observed vs EPA/WLTP Provided')}
              </Card.Description>
              <Card.Description>{t('90 km / 135 km')}</Card.Description>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DistanceTravelled;
