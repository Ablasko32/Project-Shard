import sequelize from '@/config/database';
import { DataTypes } from 'sequelize';

const Chats = sequelize.define('chats', {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	messages: {
		type: DataTypes.JSON,
	},
});

export default Chats;
