// Script to insert sample data from sample_data.sql into the database using Sequelize
// Usage: node insertSampleData.js

const fs = require('fs');
const path = require('path');
const { sequelize } = require('./src/models');

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  // Split on semicolon followed by newline to avoid issues with multi-line statements
  const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
  for (const statement of statements) {
    try {
      await sequelize.query(statement);
      console.log('Executed:', statement.substring(0, 60) + (statement.length > 60 ? '...' : ''));
    } catch (err) {
      console.error('Error executing statement:', statement.substring(0, 60), err.message);
    }
  }
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    const sqlFile = path.join(__dirname, '../sample_data.sql');
    await runSqlFile(sqlFile);
    console.log('Sample data inserted successfully.');
    await sequelize.close();
  } catch (err) {
    console.error('Failed to insert sample data:', err);
    process.exit(1);
  }
}

main();
