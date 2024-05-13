import { Card } from '../shared';
import { useTranslation } from 'react-i18next';
import SocChart from './charts/SocChart';
import useVehicleStore from 'store/store';
import { useEffect } from 'react';

const VehicleChargePattern = () => {
  const { t } = useTranslation('common');

  // const selectedVehicleId = useVehicleStore((state) => state.selectedVehicleId);
  // const vehiclesFromStore = useVehicleStore((state) => state.vehicles);

  // useEffect(() => {
    
  // }, [selectedVehicleId])
  

  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <div className="flex justify-between">
            <div className="flex items-start">
              <Card.Title>{t('Charging Pattern')}</Card.Title>
            </div>
            <div className="border flex flex-col justify-center items-center p-1">
              <Card.Description>{t('Total Energy Consumed')}</Card.Description>
              <Card.Description>{t('120 kW')}</Card.Description>
            </div>
          </div>
        </Card.Header>
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly">
            <div>
              <Card.Description>{t('Average SoC')}</Card.Description>
              <Card.Description>{t('78%')}</Card.Description>
            </div>
            <div>
              <Card.Description>{t('Connector Type')}</Card.Description>
              <Card.Description>{t('Type-1')}</Card.Description>
            </div>
          </div>
          <div className="border">
            <SocChart soc={100}/>
          </div>
          <div className="flex flex-col justify-evenly">
            <div>
              <Card.Description>
                {t('Total Charging Sessions')}
              </Card.Description>
              <Card.Description>
                {t('27')}
              </Card.Description>
            </div>
            <div>
              <Card.Description>{t('Average Charging Rate')}</Card.Description>
              <Card.Description>
                {t('0.70 kW')}
              </Card.Description>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleChargePattern;
