import { Loading } from '@/components/shared';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'types';
import { prisma } from '@/lib/prisma';
import useTeams from 'hooks/useTeams';
import { getSession, useSession } from 'next-auth/react';
import useVehicleStore from 'store/store';
import VehicleList from '@/components/shared/shell/VehicleList';

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
  // Add any other fields present in  Vehicle model
}

const Dashboard: NextPageWithLayout<{ vehicles: Vehicle[] }> = ({
  vehicles,
}) => {
  const router = useRouter();
  const { isLoading, teams } = useTeams(); // Assuming useTeams fetches team data
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

  return <VehicleList/>;
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
