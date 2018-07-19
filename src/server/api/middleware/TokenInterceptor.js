import jwt from 'jsonwebtoken';
import config from '../../config/config';

export const verifyToken = (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) return res.status(404).send({
        auth: false,
        message: 'No token was provided.'
    });

    jwt.verify(token, config.secret, (err, data) => {
        if (err) return res.status(500).send({
            auth: false, 
            message: 'failed to authenticate token.'
        });

        next();
    });
}