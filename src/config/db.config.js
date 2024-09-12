// src/config/db.config.js
import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables
config();

// Create and export Sequelize instance
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: true, // Disable logging
});


