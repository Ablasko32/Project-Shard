import pg from 'pg';
import { Sequelize, Dialect } from 'sequelize';

const dbConfig = {
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number(process.env.POSTGRES_PORT) || 5433,
	username: process.env.POSTGRES_USER || 'admin',
	password: process.env.POSTGRES_PASSWORD || 'admin',
	database: process.env.POSTGRES_DB || 'shard',
	dialect: 'postgres' as Dialect,
	dialectModule: pg,
	logging: false,
};

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	dbConfig
);

// Test connection
async function testSequelizeConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connected to database');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

testSequelizeConnection();

export default sequelize;
