const knex = require('knex');

const knexConfig = require('../knexfile.js');

let env = process.env.NODE_ENV || "development"

module.exports = knex(knexConfig[env]);
