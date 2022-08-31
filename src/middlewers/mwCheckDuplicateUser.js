const database = require('../config/database');

const checkDuplicateUser = async (req, res, next) => {
    try {
        const { email, name } = req.body;

        const getUser = await database.query('SELECT * FROM pokemon.users u WHERE u.email = $1 OR u.name = $2', [email, name]);
        if (!!getUser.length) return res.status(400).send({ error: 'Email or Name is already in use' });

        next();
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

module.exports = checkDuplicateUser;