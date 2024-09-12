// src/models/payment.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
}, { timestamps: true });

export default Payment;
