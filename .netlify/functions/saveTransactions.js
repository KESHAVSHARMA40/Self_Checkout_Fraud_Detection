// netlify/functions/saveTransaction.js
const { Client } = require('pg');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(
      'INSERT INTO transactions (items, total) VALUES ($1, $2)',
      [JSON.stringify(body.items), body.total]
    );
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Transaction saved!' }),
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save transaction' }),
    };
  }
};
