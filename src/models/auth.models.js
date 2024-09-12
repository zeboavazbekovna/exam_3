import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure usernames are unique if needed
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpexpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00, // Default balance value
  },
}, {
  tableName: 'Users',
  timestamps: true, // Add this if you want timestamps (createdAt and updatedAt)
});

export default User;
