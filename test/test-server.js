process.env.NODE_ENV = 'test';
global.Promise = require('promise');
global.chai = require('chai');
global.chaiHttp = require('chai-http');
chai.use(chaiHttp);
global.expect = chai.expect;
global.server = require("../server/app");