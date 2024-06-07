import { Card } from '@/components/shared';
import React from 'react';
import BatteryHealthChart from './charts/BatteryHealthChart';
import { useTranslation } from 'react-i18next';

const BatteryHealth = () => {
  const { t } = useTranslation('common');
  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>Battery Health</Card.Title>
        </Card.Header>
        <div className="flex justify-evenly border">
          <BatteryHealthChart />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('Avg SoH')}</Card.Description>
            <Card.Description>{t('100%')}</Card.Description>
          </div>
          <div className="flex flex-col justify-evenly">
            <Card.Description>
              {t('Avg Estimated Degradation')}
            </Card.Description>
            <Card.Description>{t('0.00%')}</Card.Description>
          </div>
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('Total Batteries')}</Card.Description>
            <Card.Description>{t('300')}</Card.Description>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <div className="flex flex-col justify-evenly">
            <Card.Description>{t('')}</Card.Description>
            <Card.Description>{t('300')}</Card.Description>
          </div>
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('Battery Condition')}</Card.Description>
            <Card.Description>{t('')}</Card.Description>
          </div> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BatteryHealth;
