import InfoCard from '@/components/dashboard/InfoCard';
import VehicleBatteryHealth from '@/components/dashboard/VehicleBatteryHealth';
import VehicleChargePattern from '@/components/dashboard/VehicleChargePattern';
import VehicleDetails from '@/components/dashboard/VehicleDetails';
import VehicleUsage from '@/components/dashboard/VehicleUsage';
import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowTrendingDownIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';
import useVehicleStore from 'store/store';

const VehicleDashboard = () => {
  const router = useRouter();

  // const selectedVehicleId = useVehicleStore((state) => state.selectedVehicleId);
  // const { vehicleId } = router.query;
  const selectedVehicleId = useVehicleStore((state) => state.selectedVehicleId);
  const vehiclesFromStore = useVehicleStore((state) => state.vehicles);
  // console.log("vehicleID",vehicleId);
  console.log("selectedVehicleId", selectedVehicleId);

  // Find the selected vehicle based on selectedVehicleId
  const selectedVehicle = vehiclesFromStore.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );
  console.log('selectedVehicle', selectedVehicle);

  return (
    <div className="flex gap-6 w-full justify-center items-center">
      {selectedVehicle ? (
        <div className="flex gap-6 flex-col">
          <div className="flex gap-6">
            <InfoCard
              titleKey="Location"
              descriptionKey="Banglore"
              icon={MapPinIcon}
            />
            <InfoCard
              titleKey="Date Of Connection"
              descriptionKey="April 23, 2024"
              icon={LinkIcon}
            />
            <InfoCard
              titleKey="Data Points Collected"
              descriptionKey="1436"
              icon={ArrowsPointingInIcon}
            />
          </div>
          <div className="flex gap-6">
            <VehicleDetails
              year={selectedVehicle.year}
              model={selectedVehicle.model}
              make={selectedVehicle.make}
              vin={selectedVehicle.vin}
              batteryCapacity={selectedVehicle.batteryCapacity}
            />
            <VehicleChargePattern soc={selectedVehicle.soc || 0} />
          </div>
          <div className="flex gap-6">
            <VehicleUsage />
            <VehicleBatteryHealth />
          </div>
          <div className="flex gap-6">
            <InfoCard
              titleKey="End Of Life"
              descriptionKey="March, 2029"
              icon={ArrowTrendingDownIcon}
            />
            <InfoCard
              titleKey="Remaining Useful Life"
              descriptionKey="1397 cycles"
              icon={ArrowPathIcon}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          Please select a vehicle
        </div>
      )}
    </div>
  );
};

export default VehicleDashboard;
