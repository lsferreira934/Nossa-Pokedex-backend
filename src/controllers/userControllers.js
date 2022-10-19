const { v4: uuidv4 } = require("uuid");
const database = require("../infra/database");

exports.listUsers = async (req, res) => {
  try {
    const users = await database.query(`SELECT * FROM pokemon.users`);

    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  };
};

exports.createUser = async (req, res) => {
  const id = uuidv4();
  const { name, email, password } = req.body;

  try {
    await database.query(
      `INSERT INTO pokemon.users (id, name, email, password) VALUES ($<id>,$<name>,$<email>,$<password>)`,
      { name, email, password, id }
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send({ "error": error.message });
  };
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const findUser = await database.query(`SELECT * FROM pokemon.users WHERE id = $1`, [userId]);
    if (!findUser.length) return res.status(400).send({ message: 'User not found' });

    return res.status(200).send(findUser);
  } catch (error) {
    return res.status(400).send({ "error": error.message });
  };
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;


  try {
    const findUser = await database.query(`SELECT * FROM pokemon.users WHERE id = $1`, [userId]);
    if (!findUser.length) return res.status(400).send({ message: 'User not found' })

    const updatedUser = await database.query(
      `UPDATE pokemon.users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email, password `,
      [name, email, password, userId]
    );

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send({ "error": error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    const findUser = await database.query(`SELECT * FROM pokemon.users WHERE id = $1`, [userId]);
    if (!findUser.length) return res.status(400).send({ message: 'User not found' })

    await database.query(`DELETE FROM pokemon.users WHERE id = $1`, [id])


    return res.status(200).send()
  } catch (error) {
    return res.status(400).send({ "error": error.message });
  }
};
