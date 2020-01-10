const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    this.timeout = 10000;

    setTimeout(function () {
      request(app)
        .get('/')
        .expect(200, done);
    }, 3000);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    this.timeout = 10000;
    
    setTimeout(function () {
      request(app)
        .get('/login')
        .expect(200, done);
    }, 3000);
  });
});

describe('GET /register', () => {
  it('should return 200 OK', (done) => {
    this.timeout = 10000;
    
    setTimeout(function () {
      request(app)
        .get('/signup')
        .expect(200, done);
    }, 3000);
  });
});

describe('GET /logout', () => {
  it('should return 200 OK', (done) => {
    this.timeout = 10000;
    
    setTimeout(function () {
      request(app)
        .get('/api')
        .expect(200, done);
    }, 3000);
  });
});

