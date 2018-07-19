import assert from 'assert';
import {getReceipt} from '../../services/receipt';
import { expect } from 'chai';

describe('#######UnitTest#########', () => {
    describe('ReceiptService', () => {
        it ('Get receipt should return not empty list', () => {
            const result = getReceipt();
            assert.equal(result[0].name, 'Arroz con Pollo');
            assert.equal(result[0].cityFrom, 'Lima');
            assert.equal(result[0].investmentCost, 30.5);

            assert.equal(result[1].name, 'Arroz con Pato');
            assert.equal(result[1].cityFrom, 'Piura');
            assert.equal(result[1].investmentCost, 50.5);
        });
    });
});