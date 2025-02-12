import sequelize from '@/config/database';
import { DataTypes } from 'sequelize';

const Prompts = sequelize.define('prompts', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

export default Prompts;
