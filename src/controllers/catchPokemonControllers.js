const { v4: uuidv4 } = require('uuid');
const database = require('../infra/database');
const api = require('../api/pokeApi');

exports.catchPokemon = async (req, res) => {
    try {
        const { userId } = req.params;
        const pokemon = req.body;

        const findUser = await database.query(`SELECT * FROM pokemon.users WHERE id = $1`, [userId]);

        if (!findUser.length) return res.status(400).send({ error: 'User not found' })

        if (!pokemon.id) return res.status(400).send({ error: "Pokemon not found" });

        const capturedPokemon = await database.query(
            `INSERT INTO pokemon.pokemons(
                id,
                pokeapi_id,
                name,
                hp,
                attack,
                defense,
                special_attack,
                special_defense,
                speed,
                type_one,
                type_two,
                sprite,
                ability_one, 
                ability_two
            )
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING id, pokeapi_id, name, hp, attack, defense, special_attack, special_defense, speed, type_one, type_two, sprite, ability_one, ability_two, date`,
            [...Object.values(pokemon).map(status => status)]
        );



        const [userCaughtPokemon] = await database.query(
            `INSERT INTO pokemon.user_pokemons( id, user_id, pokemon_id) VALUES($1, $2, $3) RETURNING id, user_id, pokemon_id`,
            [uuidv4(), userId, pokemon.id]
        );


        return res.status(200).send({
            user: userId,
            pokemon: capturedPokemon,
            catch: userCaughtPokemon.id
        })

    } catch (error) {
        return res.status(400).send({ "error": error.message })
    }
};