const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({message: 'Missing token'});
    }
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Unauthorized', error: err});
        } else {
            req.userData = decoded;
            next();
        }
    });
    
};