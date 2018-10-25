import { createConnection, getConnectionOptions } from 'typeorm';

export async function createTypeOrmConnection() {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return await createConnection({...connectionOptions, name: 'default'});
}
