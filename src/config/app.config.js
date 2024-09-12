import { config } from 'dotenv';

config();

export const appConfig = {
    port: process.env.APP_PORT || 5001,
    host: process.env.APP_HOST,
};
