import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{ timestamps: true });

export default Category;
