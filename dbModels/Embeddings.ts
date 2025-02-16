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
	documentId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'documents',
			key: 'id',
		},
	},
});

export default Embeddings;
