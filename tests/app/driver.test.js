import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../../index';

describe('Index route', () => {
    it('should return a success message', () => request(app)
      .get('/')
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the drivers api home page');
      }));
  });
  
  describe('add Driver details', () => {
    it('should fail if username is not provided', () => request(app)
      .post('/api/v1/driver')
      .set('content-type', 'application/json')
      .send({
          name: 'dodo'
      })
      .then((res) => {
        expect(res.status).to.equal(422);
        expect(res.body.errors).to.be.an('array').that.includes({
            "username": "username must not be empty"
        });
      }));
  
    it('add a new driver', () => request(app)
      .post('/api/v1/driver')
      .set('content-type', 'application/json')
      .send({
        username: 'baleeqwqw',
        name: 'mane',
        vehicle: 'toyota',
        rating: 5
      })
  
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('created driver success');
      }));
  
    it('should fail if username exists', () => request(app)
      .post('/api/v1/driver')
      .set('content-type', 'application/json')
      .send({
        username: 'baleeqwqw',
        name: 'mane',
        vehicle: 'toyota',
        rating: 5
      })
  
      .then((res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('this username already exists');
      }));

      it('should return not found when driver does not exists', () => request(app)
      .get('/api/v1/driver?username="jiwi"')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('driver not found');
      }));
    });