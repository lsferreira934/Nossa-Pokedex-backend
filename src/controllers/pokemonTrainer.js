const database = require('../infra/database');

exports.pokemonTrainerList = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const getPokemons = await database.query(`
            SELECT p.* 
            FROM pokemon.user_pokemons up
            INNER JOIN pokemon.pokemons p ON p.id = up.pokemon_id
            WHERE user_id = $<userId>
        `, { userId });

        return res.status(200).json({ pokemons: getPokemons });
    } catch (error) {
        return res.status(400).send(error);
    };
};