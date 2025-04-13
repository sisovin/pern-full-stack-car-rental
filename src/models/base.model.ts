import { Prisma } from '@prisma/client';

export const softDeleteMiddleware = async (
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<any>
) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (!params.args['data']) {
      params.args['data'] = {};
    }
    params.args['data']['deletedAt'] = new Date();
  }
  return next(params);
};
