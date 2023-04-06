// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


const sharedConfig = {
  client: 'sqlite3',

  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
    useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

// eslint-disable-next-line no-undef
module.exports = {

  development: {
    ...sharedConfig,
    connection: { filename: './data/data.db3' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' },
  },

};
