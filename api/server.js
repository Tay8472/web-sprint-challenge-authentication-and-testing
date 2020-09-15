const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
let session = require("express-session");
let KnexSessionStore = require("connect-session-knex")(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
let data = require("../database/dbConfig");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "keep it secret, keep it safe",
      store: new KnexSessionStore({
        knex: data,
        createtable: true,
      }),
    })
  );

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate.restrict(), jokesRouter);

module.exports = server;
