const jwt = require("jsonwebtoken");
const database = require("../infra/database");

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ error: 'No token provided' });

        const isToken = await database.query(`SELECT id FROM pokemon.blacklist_token WHERE token = $<token>`, { token })
        if (isToken.length) return res.status(401).send({ error: 'unauthorized' });

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) return res.status(401).send({ error: "unauthorized" });
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    }
}



