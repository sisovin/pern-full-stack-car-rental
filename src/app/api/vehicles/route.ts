import { NextApiRequest, NextApiResponse } from 'next';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '@/services/vehicle.service';
import { authenticate } from '@/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await authenticate(req, res);

  switch (req.method) {
    case 'GET':
      return getVehicles(req, res);
    case 'POST':
      return createVehicle(req, res);
    case 'PUT':
      return updateVehicle(req, res);
    case 'DELETE':
      return deleteVehicle(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
