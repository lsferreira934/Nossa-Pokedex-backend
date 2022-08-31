var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const database = require("../config/database");


const signup = async (req, res, next) => {
    const { name, email, password, roles } = req.body;
    const newUserId = uuidv4();

    const EncryptingPassword = bcrypt.hashSync(password, 8)

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
        }

        return res.status(200).send({ message: "User was registered successfully!" });
    } catch (error) {
        return res.status(400).send({ "error": error.message });
    };
};

const signin = async (req, res, next) => {
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
            expiresIn: 3600 // 1 hours
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

module.exports = { signup, signin };