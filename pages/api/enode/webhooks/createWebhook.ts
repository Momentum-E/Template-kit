// // pages/api/webhooks.js

// import axios from 'axios';
// import { getEnodeAccessToken } from '@/lib/enode/tokenUtils';
// import { NextApiRequest, NextApiResponse } from 'next';

// // let ENODE_WEBHOOK_SECRET = crypto.randomBytes(32).toString('hex');
// let ENODE_WEBHOOK_SECRET =
//   '24rwetfwertvwcedrterw3456eb5ur5yfw3d4rq456be567wc345tew45xtw45wx34q3';
// let webhookId: string[] = [];
// let webhookData;

// async function listWebHook(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const accessToken = await getEnodeAccessToken();

//     const response = await axios.get(`${process.env.ENODE_API_URL}/webhooks`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) {
//       console.log('Webhook list:', response.data);

//       webhookData = response.data.data;

//       if (webhookId.length > 0) {
//         console.log('more than 1 webhook ids');
//         webhookData.forEach(async (element) => {
//           if (element.id !== webhookId[0]) {
//             await deleteWebHook(element.id);
//           }
//         });
//       }

//       console.log('webhookID', webhookId);
//     } else {
//       console.error('Unexpected response in listing webhook:', response.status);
//       console.log('Outer else statement run.');
//     }
//   } catch (error) {
//     console.error('Error in listing webhook', error);
//     // console.log('webhook id and webhook data', webhookId, '\n', webhookData);
//   }
// }

// async function runWebHook(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const accessToken = await getEnodeAccessToken();

//     const data = {
//       secret: ENODE_WEBHOOK_SECRET,
//       url: `${process.env.NGROK_PUBLIC_URL}/api/enode/webhooks/handleWebhook`,
//       apiVersion: '2024-01-01',
//       events: ["*"],
//     };

//     const response = await axios.post(
//       `${process.env.ENODE_API_URL}/webhooks`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // console.log('response of runWebHook() function: \n', response.data);

//     if (response.status === 200) {
//       console.log('Webhook created successfully', response.data);
//       webhookId = [];
//       webhookId.push(response.data.id);
//       await listWebHook(req, res);
//       res.status(200).json(response.data); // Respond with webhook data
//     } else {
//       console.error('Unexpected response:', response.status);
//       await listWebHook(req, res);
//       res.status(response.status).end();
//     }
//   } catch (error: any) {
//     console.error(
//       'Error in setWebhook \n',
//       error.message,
//       ENODE_WEBHOOK_SECRET
//     );
//     await listWebHook(req, res);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// async function updateWebHook(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const accessToken = await getEnodeAccessToken();

//     const data = {
//       secret: ENODE_WEBHOOK_SECRET,
//       url: `${process.env.NGROK_PUBLIC_URL}/api/enode/webhooks/handleWebhook`,
//       apiVersion: '2024-01-01',
//       events: ['*'],
//     };

//     const response = await axios.patch(
//       `${process.env.ENODE_API_URL}/webhooks/${webhookId[0]}`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (response.status === 200) {
//       console.log(
//         'Webhook updated successfully',
//         response.data,
//         ENODE_WEBHOOK_SECRET
//       );
//       console.log('webhookId', webhookId);
//       res.status(200).json(response.data); // Respond with updated webhook data
//     } else {
//       console.error('Unexpected response:', response.status);
//       res.status(response.status).end();
//     }
//   } catch (error) {
//     console.error('Error in updateWebhook', error);
//     console.log('webhookId', webhookId);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// async function deleteWebHook(id: string) {
//   try {
//     const accessToken = await getEnodeAccessToken();

//     const response = await axios.delete(
//       `${process.env.ENODE_API_URL}/webhooks/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log(JSON.stringify(response.data));
//     console.log(`webhook ${id} deleted successfully`);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case 'GET':
//       await listWebHook(req, res);
//       break;
//     case 'POST':
//       await runWebHook(req, res);
//       break;
//     case 'PATCH':
//       await updateWebHook(req, res);
//       break;
//     case 'DELETE':
//       if (typeof req.query.id === 'string') {
//         await deleteWebHook(req.query.id);
//         res.status(200).json({ message: 'Webhook deleted successfully' }); // Respond with success message
//       } else {
//         res.status(400).json({ error: 'Invalid request' }); // Respond with error message
//       }
//       break;
//     default:
//       res.status(405).json({ error: 'Method Not Allowed' }); // Respond with error message
//       break;
//   }
// }

// // pages/api/webhooks.js

import axios from 'axios';
import { getEnodeAccessToken } from '@/lib/enode/tokenUtils';
import { NextApiRequest, NextApiResponse } from 'next';

let ENODE_WEBHOOK_SECRET =
  '24rwetfwertvwcedrterw3456eb5ur5yfw3d4rq456be567wc345tew45xtw45wx34q3';

async function listWebHook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = await getEnodeAccessToken();

    const response = await axios.get(`${process.env.ENODE_API_URL}/webhooks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error in listing webhook', error);
    // console.log('webhook id and webhook data', webhookId, '\n', webhookData);
  }
}

async function runWebHook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const webhookList = await listWebHook(req, res);
    console.log('Webhook List returned', webhookList);
    if (webhookList.data.length == 0) {
      const accessToken = await getEnodeAccessToken();
      const data = {
        secret: ENODE_WEBHOOK_SECRET,
        url: `${process.env.NGROK_PUBLIC_URL}/api/enode/webhooks/handleWebhook`,
        apiVersion: '2024-01-01',
        events: ["*"],
      };
      const response = await axios.post(
        `${process.env.ENODE_API_URL}/webhooks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response of runWebHook() function: \n', response.data);
    } else if(webhookList.data[0].url !== `${process.env.NGROK_PUBLIC_URL}/api/enode/webhooks/handleWebhook` && webhookList.data[0].isActive == true){
      await updateWebHook(webhookList.data[0].id);
    }
    else if (webhookList.data[0].isActive == false) {
      const response = await deleteWebHook(webhookList.data[0].id);
      await runWebHook(req, res);
    }
    
    res.status(200).json(webhookList); // Respond with webhook data
  } catch (error: any) {
    console.error(
      'Error in setWebhook \n',
      error.message,
      ENODE_WEBHOOK_SECRET
    );
    // await listWebHook(req, res);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateWebHook(id: string) {
  try {
    const accessToken = await getEnodeAccessToken();

    const data = {
      secret: ENODE_WEBHOOK_SECRET,
      url: `${process.env.NGROK_PUBLIC_URL}/api/enode/webhooks/handleWebhook`,
      apiVersion: '2024-01-01',
      events: ['*'],
    };

    const response = await axios.patch(
      `${process.env.ENODE_API_URL}/webhooks/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log(
        'Webhook updated successfully',
        response.data,
        ENODE_WEBHOOK_SECRET
      );
      console.log('webhookId', id);
      return response.data;
      // res.status(200).json(response.data); // Respond with updated webhook data
    } else {
      console.error('Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('Error in updateWebhook', error);
    console.log('webhookId', id);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteWebHook(id: string) {
  try {
    const accessToken = await getEnodeAccessToken();

    const response = await axios.delete(
      `${process.env.ENODE_API_URL}/webhooks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(JSON.stringify(response.data));
    console.log(`webhook ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await listWebHook(req, res);
      break;
    case 'POST':
      await runWebHook(req, res);
      break;
    case 'PATCH':
      await updateWebHook(req, res);
      break;
    case 'DELETE':
      if (typeof req.query.id === 'string') {
        await deleteWebHook(req.query.id);
        res.status(200).json({ message: 'Webhook deleted successfully' }); // Respond with success message
      } else {
        res.status(400).json({ error: 'Invalid request' }); // Respond with error message
      }
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' }); // Respond with error message
      break;
  }
}
