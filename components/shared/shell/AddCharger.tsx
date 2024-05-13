import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from 'react-daisyui';
import { useTranslation } from 'next-i18next';
// import Modal from '../Modal'; // Assuming Modal component is in a separate file
import InputWithLabel from '../InputWithLabel';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Vehicle {
  location: string;
  date_of_connection: string;
  data_points_collected: number;
  vehicle_information: {
    odometer: number;
    vehicle_model: string;
    model_year: number;
    VIN: string;
    battery_capacity: string;
    charging_pattern: {
      total_energy_consumed: string;
      average_SOC: string;
      connector_type: string;
      total_charging_sessions: number;
      average_charging_rate: string;
    };
    usage: {
      avg_daily_km_driven: string;
      temperature_low_high: string;
      SOC_range: string;
      range_observed_min_max: string;
      real_range_observed: string;
      observed_vs_EPA_WLTP_provided: string;
    };
    battery_health: {
      SoH: string;
      estimated_degradation: string;
      battery_chemistry: string;
      end_of_life: string;
      remaining_useful_life: number;
    };
  };
}

const AddCharger = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [showModal, setShowModal] = useState(false);
  const [vin, setVin] = useState('');

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const handleAddVehicle = async () => {
    try {
      const response = await axios.post(
        `/api/enode/user/${session?.user.id}/linkSession`
      ); // Call the link session API
      const linkUrl = response.data.linkUrl; // Extract the link URL from the response

      // Use router to navigate to the obtained link URL
      router.push(linkUrl);
    } catch (error) {
      console.error('Error creating Link session:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setVin('');
      setShowModal(false);
    }
  };

  return (
    <div >
      <Button
        color="primary"
        size="md"
        className="w-full mb-4"
        onClick={handleAddVehicle}
      >
        {t('Add Charger')}
      </Button>
    </div>
  );
};

export default AddCharger;
