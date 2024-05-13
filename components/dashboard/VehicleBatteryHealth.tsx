import React from 'react';
import { Card } from '../shared'; // Assuming Card component is in the '../shared' directory
import { useTranslation } from 'react-i18next';
import SohChart from './charts/SohChart';

const VehicleBatteryHealth = () => {
  const { t } = useTranslation('common');
  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <div className="flex justify-between">
            <div className="flex items-start">
              <Card.Title>{t('Battery Health')}</Card.Title>
            </div>
            {/* <div className="border p-1 flex flex-col justify-center items-center">
              <Card.Description>{t('State Of Health')}</Card.Description>
              <Card.Description>{t('100%')}</Card.Description>
            </div> */}
          </div>
        </Card.Header>
        <div className="border">
          <SohChart />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('SoH')}</Card.Description>
            <Card.Description>{t('100%')}</Card.Description>
          </div>
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('Estimated Degradation')}</Card.Description>
            <Card.Description>{t('0.00%')}</Card.Description>
          </div>
          <div className="flex flex-col justify-evenly">
            <Card.Description>{t('Battery Chemistry')}</Card.Description>
            <Card.Description>{t('Li-ion')}</Card.Description>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleBatteryHealth;
