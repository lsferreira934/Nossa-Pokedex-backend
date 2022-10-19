const database = require('../infra/database');

exports.isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId;

        const getRoles = await database.query(`SELECT * FROM pokemon.roles r WHERE r.name = $1`, ['admin']);
        const checkIsAdmin = await database.query(`SELECT * FROM pokemon.user_roles ur WHERE ur.role_id = $1 AND ur.user_id = $2`, [getRoles[0].id, userId]);

        if (!checkIsAdmin.length) return res.status(403).send({ error: "Require Admin Role!" });
        next();
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    }
};

exports.isModerator = async (req, res, next) => {
    try {
        const userId = req.userId;

        const getRoles = await database.query(`SELECT * FROM pokemon.roles r WHERE r.name = $1`, ['moderator']);
        const checkIsModerator = await database.query(`SELECT * FROM pokemon.user_roles ur WHERE ur.role_id = $1 AND ur.user_id = $2`, [getRoles[0].id, userId]);

        if (!checkIsModerator.length) return res.status(403).send({ error: "Require Moderator Role!" });
        next();
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    }
};