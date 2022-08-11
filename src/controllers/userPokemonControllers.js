const database = require('../config/database');

const userPokemonList = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const getPokemonByUser = await database.query(`SELECT * FROM pokemon.user_pokemons WHERE user_id = $1`, [userId]);

        if (getPokemonByUser.length) {
            const getPokemons = await database.query(`SELECT * FROM pokemon.pokemons WHERE id IN (${getPokemonByUser.map((pokemon, i) => `$${i + 1}`)})`,
                [...getPokemonByUser.map((pokemon) => pokemon.pokemon_id)]
            );
    
            return res.status(200).send(getPokemons);
        };

        res.status(200).send({ menssage: 'Pokemons not found' });
    } catch (error) {
        return res.status(400).send(error);
    };
};


module.exports = { userPokemonList };