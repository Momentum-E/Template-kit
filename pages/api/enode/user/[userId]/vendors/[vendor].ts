import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnodeAccessToken } from '@/lib/enode/tokenUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is DELETE
  if (req.method === 'DELETE') {
    const { userId, vendor } = req.query;
    console.log(userId, vendor)

    // Check if userId and vendor parameters are provided
    if (!userId || !vendor) {
      return res
        .status(400)
        .json({ error: 'Both userId and vendor are required' });
    }

    try {
      const accessToken = await getEnodeAccessToken();
      const response = await axios.delete(
        `${process.env.ENODE_API_URL}/users/${userId}/vendors/${vendor}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 204) {
        console.log('Vendor disconnected successfully');
        return res.status(204).end();
      } else {
        console.error('Failed to disconnect vendor');
        return res
          .status(response.status)
          .json({ error: 'Failed to disconnect vendor' });
      }
    } catch (error) {
      console.error('Error disconnecting vendor:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // If the request method is not DELETE, return a method not allowed error
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
