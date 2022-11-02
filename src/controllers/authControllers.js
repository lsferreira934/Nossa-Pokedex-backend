var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const database = require("../infra/database");

exports.signup = async (req, res) => {
    const { name, email, password, roles } = req.body;
    const newUserId = uuidv4();

    const EncryptingPassword = bcrypt.hashSync(password, 8);

    try {
        await database.query(
            `INSERT INTO pokemon.users (id, name, email, password) VALUES ($<newUserId>, $<name>, $<email>, $<password>)`,
            { newUserId, name, email, password: EncryptingPassword }
        );

        const getRoles = await database.query(`SELECT * FROM pokemon.roles r WHERE r.name IN (${roles.map((r, i) => `$${i + 1}`).toString()})`, [...roles]);

        for (const role of getRoles) {
            await database.query(`INSERT INTO pokemon.user_roles (id, role_id, user_id) VALUES ($<newUserRoleId>, $<roleId>, $<newUserId>)`,
                { newUserRoleId: uuidv4(), roleId: role.id, newUserId }
            );
        };

        return res.status(200).send({ message: "User was registered successfully!" });
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [findUser] = await database.query(`SELECT * FROM pokemon.users u  WHERE u.email = $1`, [email]);
        if (!findUser) return res.status(400).send({ message: 'User not found' });

        const passwordIsValid = await bcrypt.compare(password, findUser.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        };

        const token = jwt.sign({ id: findUser.id }, process.env.SECRET_JWT, {
            expiresIn: 3600 // 1Hora
        });

        const refreshToken = jwt.sign({ id: findUser.id, token: token }, process.env.SECRET_JWT_REFRESH, {
            expiresIn: 86400 // 24 hours
        });

        const authorities = [];

        const getRoles = await database.query(`SELECT * 
                                                 FROM pokemon.user_roles ur
                                                INNER JOIN pokemon.roles r ON r.id = ur.role_id
                                                WHERE ur.user_id = $1`, [findUser.id]
        );


        for (const role of getRoles) {
            authorities.push(role.name);
        }

        return res.status(200).send({
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken,
        });
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

exports.logoff = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ error: 'No token provided' });

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ error: "unauthorized", err });

            await database.query(`INSERT INTO pokemon.blacklist_token (id, user_id, token) VALUES ($<id>, $<userId>, $<token>)`, { id: uuidv4(), userId: decoded.id, token })
            res.status(200).end();
        });
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No token provided' });

    jwt.verify(refreshToken, process.env.SECRET_JWT_REFRESH, (err, decoded) => {
        if (err) return res.status(401).send({ error: "unauthorized", err });

        const newToken = jwt.sign({ id: decoded.id }, process.env.SECRET_JWT, {
            expiresIn: 3600 // 1 hours
        });
        res.status(200).json({ token: newToken });
    });
};