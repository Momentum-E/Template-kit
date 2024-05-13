import { Card } from '../shared';
import { useTranslation } from 'react-i18next';

const VehicleDetails = ({year, model, make, vin, batteryCapacity}) => {
  const { t } = useTranslation('common');
  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>{t('Vehicle Information')}</Card.Title>
        </Card.Header>
        <div>
          <Card.Description>{t('Odometer : 123456')}</Card.Description>
          <Card.Description>{t(`Manufacturer : ${make}`)}</Card.Description>
          <Card.Description>{t(`Vehicle Model : ${model}`)}</Card.Description>
          <Card.Description>{t(`Model Year : ${year}`)}</Card.Description>
          <Card.Description>{t(`VIN : ${vin}`)}</Card.Description>
          <Card.Description>{t(`Battery Capacity : ${batteryCapacity}kWh`)}</Card.Description>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleDetails;
