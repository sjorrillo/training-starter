import assert from 'assert';
import {jwtLogin} from '../../services/user';
import { expect } from 'chai';

describe('#######UnitTest#########', () => {
    describe('UserService', () => {
        it ('Login with correct user and password should return success', () => {
            const result = jwtLogin('admin', 'admin');
            assert.equal(result.auth, true);
            expect(result.token).is.not.empty;
        });
        it ('Login with wrong user and password should return fail', () => {
            const result = jwtLogin('wrong_user', 'wrong_pwd');
            assert.equal(result.auth, false);
            assert.equal(result.message, 'Usuario no existe.');
        });
    });
});