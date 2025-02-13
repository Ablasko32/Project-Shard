import Prompts from '@/dbModels/Prompts';
import Chats from '@/dbModels/Chats';
import Settings from '@/dbModels/Settings';
import sequelize from '@/config/database';

sequelize.sync({ alter: true }).then(() => console.log('TABLES CREATED'));

export { Prompts, sequelize, Settings, Chats };
