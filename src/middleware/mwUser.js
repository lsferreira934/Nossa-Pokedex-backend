const database = require('../infra/database');

exports.checkDuplicateUser = async (req, res, next) => {
    try {
        const { email, name } = req.body;

        const getUser = await database.query('SELECT * FROM pokemon.users u WHERE u.email = $1 OR u.name = $2', [email, name]);
        if (!!getUser.length) return res.status(400).send({ error: 'Email or Name is already in use' });

        next();
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

exports.checkRolesExisted = async (req, res, next) => {
    try {
        if (req.body.roles) {
            const getRoles = await database.query(`SELECT name FROM pokemon.roles`);
            const allRolesNames = getRoles.map(role => role.name)
            for (const role of req.body.roles) {
                if (!allRolesNames.includes(role)) return res.status(400).send({ message: "Failed! Role does not exist = " + role });
            };
        };
        next();
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};
