import sequelize from '@/config/database';
import { DataTypes } from 'sequelize';

const Settings = sequelize.define('settings', {
	username: {
		type: DataTypes.STRING,
	},
	system: { type: DataTypes.TEXT },
});

export default Settings;
