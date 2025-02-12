import Prompts from '@/dbModels/Prompts';
import sequelize from '@/config/database';

sequelize.sync().then(() => console.log('TABLES CREATED'));

export { Prompts, sequelize };
