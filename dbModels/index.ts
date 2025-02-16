import Prompts from '@/dbModels/Prompts';
import Chats from '@/dbModels/Chats';
import Settings from '@/dbModels/Settings';
import Embeddings from '@/dbModels/Embeddings';
import Documents from '@/dbModels/Documents';
import sequelize from '@/config/database';

sequelize.sync({ alter: true }).then(() => console.log('TABLES CREATED'));

// relationships
Embeddings.belongsTo(Documents, { foreignKey: 'documentId' });
Documents.hasMany(Embeddings, {
	foreignKey: 'documentId',
	onDelete: 'CASCADE',
});

export { Prompts, sequelize, Settings, Chats, Embeddings, Documents };
