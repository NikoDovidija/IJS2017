import 'reflect-metadata';
import { ApiServer } from "./server/index";
import { DatabaseProvider } from './db';

DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE as any || 'postgres',
    database: process.env.DATABASE_NAME as any || 'customer_db',
    username: process.env.DATABASE_USERNAME as any || 'niko',
    password: process.env.DATABASE_PASS as any || 'niko123',
    host: process.env.DATABASE_HOST as any || 'localhost',
    port: process.env.DATABASE_PORT as any || 5432,
    ssl: !!process.env.SSL

})
const server = new ApiServer();
server.start(+process.env.PORT || 3000);