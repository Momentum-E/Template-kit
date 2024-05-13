import { create } from 'zustand';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  ownerId: string;
  vin: string;
  batteryCapacity: string;
  dateOfConnection: string;
  soc: number;
  // Add any other fields present in your Vehicle model
}

interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicleId: (id: string) => void;
}

const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  selectedVehicleId: "",
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicleId: (id: string) => set((state) => ({ ...state, selectedVehicleId: id })),
}));

export default useVehicleStore;
