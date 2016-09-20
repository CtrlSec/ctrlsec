module.exports = {
  connections: {
    postgres: {
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "user": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "adapter": "sails-postgresql"
    }
  },
  models: {
      connection: 'postgres',
      migrate: 'safe'
  },
  session: {
      secret: process.env.SESSION_SECRET
  },
  port: process.env.PORT
};
