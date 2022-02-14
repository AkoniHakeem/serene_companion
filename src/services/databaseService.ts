import { createQueryBuilder, EntityManager, getManager } from 'typeorm';

export const db = (connectionName = 'default'): EntityManager => {
  return getManager(connectionName);
};

export const queryBuilder = createQueryBuilder;
