import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, { timestamps: true });

export default Order;
