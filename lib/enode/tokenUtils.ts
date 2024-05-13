import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();

export const getEnodeAccessToken = async () => {
  try {
    const token = await prisma.enodeToken.findFirst({
      select: {
        token: true,
        createdAt: true,
      },
    });

    console.log('getAccessToken', token);

    let accessToken = token?.token || '';

    if (
      !accessToken ||
      (token && accessToken && isTokenExpired(token.createdAt))
    ) {
      await prisma.enodeToken.deleteMany();
      accessToken = await generateAccessToken();
      // Save the access token in the EnodeToken table
      const savedToken = await prisma.enodeToken.create({
        data: {
          token: accessToken,
        },
      });
    }

    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};

export const generateAccessToken = async () => {
  try {
    // Check if environment variables are defined and have valid values
    const clientId = process.env.ENODE_CLIENT_ID;
    const clientSecret = process.env.ENODE_CLIENT_SECRET;
    const tokenEndpoint = process.env.ENODE_OAUTH_URL;

    if (!clientId || !clientSecret || !tokenEndpoint) {
      throw new Error(
        'Client ID, Client Secret, or Token Endpoint is not defined'
      );
    }

    // Ensure both clientId and clientSecret are strings
    if (
      typeof clientId !== 'string' ||
      typeof clientSecret !== 'string' ||
      typeof tokenEndpoint !== 'string'
    ) {
      throw new Error('Invalid Client ID, Client Secret, or Token Endpoint');
    }

    const response = await axios.post(
      `${tokenEndpoint}/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );

    const data = response.data;
    console.log(data);
    return data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
};

export const isTokenExpired = (createdAt: Date): boolean => {
  const now = new Date();
  const twelveHoursAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000); // 1 hours ago

  return createdAt < twelveHoursAgo;
};
