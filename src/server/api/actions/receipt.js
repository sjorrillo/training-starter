import { getReceipt } from '../../services/receipt';

export const getReceipts = (req, resp) => {
    const result = getReceipt(req);
    return resp.json(result);
};