import sequelize from '@/config/database';
import { DataTypes } from 'sequelize';

const Documents = sequelize.define('documents', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	extension: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	size: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
});

export default Documents;
