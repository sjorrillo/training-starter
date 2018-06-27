import request from 'supertest';
import { expect } from 'chai';
import app from '../api';


describe('API/users', () => {
  describe('Get default user', () => {
    it('Should return javier orrillo as default user', async () => {
      await request(app)
        .get('/api/user')
        .expect(res => {
          expect(res.body.user).to.equal('javier');
          expect(res.body.name).to.equal('javier Orrillo');
        });
    });
  });
});
