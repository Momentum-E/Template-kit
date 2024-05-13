import InfoCard from '@/components/dashboard/InfoCard';
import VehicleBatteryHealth from '@/components/dashboard/VehicleBatteryHealth';
import VehicleChargePattern from '@/components/dashboard/VehicleChargePattern';
import VehicleDetails from '@/components/dashboard/VehicleDetails';
import VehicleUsage from '@/components/dashboard/VehicleUsage';
import { Loading } from '@/components/shared';
import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowTrendingDownIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { NextPageWithLayout } from 'types';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import useTeams from 'hooks/useTeams';
import { getSession, useSession } from 'next-auth/react';
import useVehicleStore from 'store/store';

// const prisma = new PrismaClient();

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  ownerId: string;
  vin: string;
  batteryCapacity: string;
  dateOfConnection: string;
  soc: number
  // Add any other fields present in  Vehicle model
}

const Dashboard: NextPageWithLayout<{ vehicles: Vehicle[] }> = ({
  vehicles,
}) => {
  const router = useRouter();
  const { isLoading, teams } = useTeams(); // Assuming useTeams fetches team data
  const { t } = useTranslation('common');
  const setVehicles = useVehicleStore((state) => state.setVehicles);
  const selectedVehicleId = useVehicleStore((state) => state.selectedVehicleId);
  const vehiclesFromStore = useVehicleStore((state) => state.vehicles);

  console.log('dashbooard selectedvehicleId', selectedVehicleId);
  console.log('dashboard vehiclesFromStore', vehiclesFromStore);

  useEffect(() => {
    if (isLoading || !teams) {
      return;
    }

    if (teams.length === 0) {
      router.push('teams?newTeam=true');
    }
  }, [isLoading, router, teams]);

  useEffect(() => {
    setVehicles(vehicles); // Update the state of vehicles using Zustand
  }, [vehicles, setVehicles]);

  if (isLoading) {
    return <Loading />;
  }

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
            <VehicleChargePattern />
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

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  try {
    const session = await getSession({ req });
    const userId = session?.user.id;
    console.log(userId);

    const vehicles = await prisma.vehicle.findMany({
      where: {
        ownerId: userId, // Filter vehicles by ownerId (current user's ID)
      },
    }); // Fetch vehicles from the database

    // Convert Date objects to string representations
    const serializedVehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      dateOfConnection: vehicle.dateOfConnection.toISOString(),
      createdAt: vehicle.createdAt.toISOString(), // Convert createdAt to ISO string
      updatedAt: vehicle.updatedAt.toISOString(), // Convert updatedAt to ISO string
    }));

    return {
      props: {
        vehicles: serializedVehicles,
        ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      },
    };
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return {
      props: {
        vehicles: [],
        ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      },
    };
  }
}

export default Dashboard;
