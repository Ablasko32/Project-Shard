import sequelize from '@/config/database';
import { DataTypes } from 'sequelize';

const Embeddings = sequelize.define('embeddings', {
	chunk: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	embedding: {
		type: DataTypes.VECTOR(768),
		allowNull: false,
	},
});

export default Embeddings;
