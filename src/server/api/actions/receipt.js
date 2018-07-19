import { getReceipt } from '../../services/receipt';

export const getReceipts = (req, resp, next) => {
    const result = getReceipt();
    return resp.json(result);
};