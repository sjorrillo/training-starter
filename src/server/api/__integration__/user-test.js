import request from 'supertest';
import { expect } from 'chai';
import app from '../api';


describe('API/users', () => {
  describe('Authenticate with JWT', () => {
    it('Authenticate with correct user and password should return success', async () => {
      await request(app)
        .post('/api/account/secure/login')
        .send({
          user: 'admin',
          password: 'admin'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body.auth).to.equal(true);
          expect(res.body.token).to.be.not.empty;
        });
    });
    it('Authenticate with wrong user and password should return fail', async() => {
      await request(app)
        .post('/api/account/secure/login')
        .send({
          user: 'wrong_user',
          password: 'wrong_password'
        })
        .set('Accept', 'application/json')
        .expect(404)
        .expect(res => {
          expect(res.body.auth).to.equal(false);
          expect(res.body.message).to.equals('Usuario no existe.');
        });
    })
  });
});
