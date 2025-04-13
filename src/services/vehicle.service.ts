import prisma from '../config/database';

class VehicleService {
  async getAllVehicles() {
    return await prisma.vehicle.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async getVehicleById(id: string) {
    return await prisma.vehicle.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
    });
  }

  async createVehicle(data: any) {
    return await prisma.vehicle.create({
      data,
    });
  }

  async updateVehicle(id: string, data: any) {
    return await prisma.vehicle.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }

  async deleteVehicle(id: string) {
    return await prisma.vehicle.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

export default new VehicleService();
