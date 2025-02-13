import Prompts from '@/dbModels/Prompts';
import Settings from '@/dbModels/Settings';
import sequelize from '@/config/database';

sequelize.sync().then(() => console.log('TABLES CREATED'));

export { Prompts, sequelize, Settings };
