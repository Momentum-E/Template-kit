import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getEnodeAccessToken } from '@/lib/enode/tokenUtils';

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;
    console.log(userId);
    const accessToken = await getEnodeAccessToken();
    console.log('fetchUser', accessToken);

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token missing' });
    }

    // Link the vehicles here if not already linked

    // Fetch the user using the /users/{userId} endpoint
    // const userId = '1ab23cd4'; // Replace with the actual user ID
    const userResponse = await axios.get(
      `https://enode-api.sandbox.enode.io/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = userResponse.data;

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
