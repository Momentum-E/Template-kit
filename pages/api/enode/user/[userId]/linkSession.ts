import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getEnodeAccessToken } from '@/lib/enode/tokenUtils';
import middleware from 'middleware';

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;
    console.log(req.query);
    const accessToken = await getEnodeAccessToken();
    console.log('Session hit', accessToken);
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token missing' });
    }

    // Prepare the request body
    const requestBody = {
      vendorType: 'vehicle',
      scopes: [
        'vehicle:read:data',
        'vehicle:read:location',
        'vehicle:control:charging',
      ],
      language: 'en-US',
      redirectUri: 'http://localhost:4002/dashboard',
    };

    // Make the API call to create the Link session
    const response = await axios.post(
      `https://enode-api.sandbox.enode.io/users/${userId}/link`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract linkUrl from the response
    const linkUrl = response.data.linkUrl;

    res.status(200).json({ linkUrl });
  } catch (error) {
    console.error('Error creating Link session:', error);
    res.status(500).json({ error: 'Failed to create Link session' });
  }
}
