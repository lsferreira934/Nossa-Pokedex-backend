const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ error: 'No token provided' });

    
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) return res.status(401).send({ error: "unauthorized" });
        req.userId = decoded.id;
        next();
    });
}


const mwJwt = {
    verifyToken,
};

module.exports = mwJwt;