import pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	host: 'localhost',
	port: 5433,
	username: 'admin',
	password: 'admin',
	database: 'shard',
	dialect: 'postgres',
	dialectModule: pg,
	logging: false,
});

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
