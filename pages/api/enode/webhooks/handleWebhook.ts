// pages/api/enode/webhooks/handleWebhook.js

import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();

// This should be replaced with your actual secret
const WEBHOOK_SECRET =
  '24rwetfwertvwcedrterw3456eb5ur5yfw3d4rq456be567wc345tew45xtw45wx34q3';

export default async function handleWebhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Read headers from the request
    const signature = req.headers['x-enode-signature'] as string | undefined;

    // Verify signature
    const isValidSignature = verifySignature(
      req.body,
      signature,
      WEBHOOK_SECRET
    );
    if (!isValidSignature) {
      console.error('Invalid signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    // Process webhook payload
    const events = req.body;
    events.forEach((event: any) => {
      handleEvent(event);
    });

    // Respond with success
    res.status(200).json({ message: 'Webhook payload processed successfully' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to verify the signature
function verifySignature(
  payload: any,
  signature: string | undefined,
  secret: string
) {
  if (!signature) return false;

  const hmac = crypto.createHmac('sha1', secret);
  const digest = Buffer.from(
    'sha1=' + hmac.update(JSON.stringify(payload)).digest('hex'),
    'utf8'
  );
  const receivedSignature = Buffer.from(signature, 'utf8');

  return crypto.timingSafeEqual(digest, receivedSignature);
}

// Function to handle each event
async function handleEvent(event: any) {
  try {
    console.log('event:', event.event);

    // // Check if the event contains vehicle information
    if (event.event === 'user:vehicle:discovered') {
      // Parse and extract vehicle information from the event
      const vehicle = event.vehicle; // Assuming vehicleInfo is provided in the event

      // Save vehicle information to the database
      const savedVehicle = await prisma.vehicle.create({
        data: {
          id: vehicle.id,
          make: vehicle.information.brand,
          model: vehicle.information.model,
          year: vehicle.information.year,
          vin: vehicle.information.vin,
          odometer: vehicle.odometer.distance,
          batteryCapacity: vehicle.chargeState.batteryCapacity,
          owner: { connect: { id: vehicle.userId } },
          dateOfConnection: new Date(),
          soc: vehicle.chargeState.batteryLevel,
        },
      });

      console.log('Vehicle information saved:', savedVehicle);
    } else if (event.event === 'user:vehicle:updated') {
      // Parse and extract vehicle information from the event
      const updatedVehicle = event.vehicle;

      // Retrieve existing vehicle data from the database
      const existingVehicle = await prisma.vehicle.findUnique({
        where: {
          id: updatedVehicle.id,
        },
      });

      if (!existingVehicle) {
        console.error('Vehicle not found in the database:', updatedVehicle.id);
        return;
      }

      // Compare received vehicle data with existing data
      const hasOdometerChange = updatedVehicle.odometer.distance !== existingVehicle.odometer;
      const hasBatteryCapacityChange = updatedVehicle.chargeState.batteryCapacity !== existingVehicle.batteryCapacity;
      const hasSocChange = updatedVehicle.chargeState.batteryLevel !== existingVehicle.soc;

      if (hasOdometerChange || hasBatteryCapacityChange) {
        // Update the vehicle data in the database
        const updatedFields: any = {};
        if (hasOdometerChange) {
          updatedFields.odometer = updatedVehicle.odometer.distance;
        }
        if (hasBatteryCapacityChange) {
          updatedFields.batteryCapacity =
            updatedVehicle.chargeState.batteryCapacity;
        }
        if (hasSocChange) {
          updatedFields.soc = updatedVehicle.chargeState.batteryLevel;
        }

        updatedFields.updatedAt = new Date();

        const updatedVehicleData = await prisma.vehicle.update({
          where: {
            id: updatedVehicle.id,
          },
          data: updatedFields,
        });

        console.log('Vehicle information updated:', updatedVehicleData);
      } else {
        console.log('No changes detected for vehicle:', updatedVehicle.id);
      }
    } else if (event.event === 'user:vehicle:deleted') {
      // Extract the vehicle ID from the event
      const vehicle = event.vehicle;

      // Delete the vehicle from the database
      const deletedVehicle = await prisma.vehicle.delete({
        where: {
          id: vehicle.id,
        },
      });

      console.log('Vehicle deleted:', deletedVehicle);
    } else {
      console.log('Skipping event:', event.event);
    }
  } catch (error) {
    console.error('Error handling events:', error);
  }
}
