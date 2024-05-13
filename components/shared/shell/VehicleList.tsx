import React, { useState } from 'react';
import useVehicleStore from 'store/store';

const VehicleList = () => {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const setSelectedVehicleId = useVehicleStore((state) => state.setSelectedVehicleId);
  const selectedVehicleId = useVehicleStore((state) => state.selectedVehicleId);
  

  return (
    <div className="flex flex-1 flex-col">
      <h1>Vehicle List</h1>
      {vehicles.map((vehicle) => (
        <div
          // className="group flex items-center rounded text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 px-2 p-2 gap-2 "
          className={`group flex items-center rounded text-sm text-gray-900 ${
            selectedVehicleId === vehicle.id
              ? 'text-white bg-gray-800 hover:bg-gray-100 hover:text-gray-900' // Apply black background if selected
              : 'hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800'
          } px-2 p-2 gap-2`}
          key={vehicle.id}
          onClick={() => setSelectedVehicleId(vehicle.id)}
        >
          {vehicle.vin}
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
