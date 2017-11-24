process.env.NODE_ENV = 'test';
global.chai = require('chai');
global.request = require('supertest');
global.server = require("../server/app")
server.close();