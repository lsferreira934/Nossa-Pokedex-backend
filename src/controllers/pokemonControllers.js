const { v4: uuidv4 } = require("uuid");

const database = require("../config/database");

const api = require("../api/pokeApi");

const listPokemons = async (req, res, next) => {

  try {

    const randomPokemons = [],

      pokemonsIds = [],

      pokemonId = [],

      allPokemons = [];



    let count = 0;



    for (let i = 0; i < 25; i++) {

      let sortNumber;

      do {

        sortNumber = Math.floor(Math.random() * 476) + 1;

      } while ([210, 238, 222, 251, 227, 225, 231, 226].includes(sortNumber))

      randomPokemons.push(sortNumber);

    };

    for await (const id of randomPokemons) {

      const { data } = await api(`/evolution-chain/` + id)

      pokemonId.push(data)

    };

    pokemonId.forEach((pokemon) => {

      const newPokemon = pokemon



      if (count < 10) {

        pokemonsIds.push(newPokemon.chain.species.url.split("/")[6]);

      } else if (count > 10 && count < 20) {

        if (newPokemon.chain.evolves_to.length) {

          pokemonsIds.push(newPokemon.chain.evolves_to[0].species.url.split("/")[6]);

        };

      } else {

        if (newPokemon.chain.evolves_to.length) {

          if (newPokemon.chain.evolves_to[0].evolves_to.length) {

            pokemonsIds.push(newPokemon.chain.evolves_to[0].evolves_to[0].species.url.split("/")[6]);

          };

        };

      };

      count++;

    });

    for await (const id of pokemonsIds) {

      const { data } = await api(`/pokemon/` + id)

      allPokemons.push(data)

    };
    const preparePokemons = allPokemons.map((pokemon) => {

      const newPokemon = pokemon;

      let createPokemon = {

        id: uuidv4(),

        pokeapi_id: newPokemon.id,

        name: newPokemon.name,

        type_one: newPokemon.types[0].type.name,

        type_two: newPokemon.types[1] ? newPokemon.types[1].type.name : null,

        sprite: newPokemon.sprites.other["official-artwork"].front_default

      }

      newPokemon.stats.forEach((stat) => {

        if (stat.stat.name.includes('-')) {

          createPokemon[stat.stat.name.replace('-', '_')] = stat.base_stat

        } else {

          createPokemon[stat.stat.name] = stat.base_stat

        };

      });

      const totalAbilities = newPokemon.abilities.length;

      let ability_one = Math.floor(Math.random() * totalAbilities) + 1;

      let ability_two = Math.floor(Math.random() * totalAbilities) + 1;



      if (totalAbilities > 1) {
        do {
          ability_two = MAth.floor(Math.random() * totalAbilities) + 1
        } while (ability_one == ability_two) ability_two = Math.floor(Math.random() * totalAbilities) + 1;

        createPokemon.ability_two = newPokemon.abilities[ability_two - 1].ability.name

      };

      createPokemon.ability_one = newPokemon.abilities[ability_one - 1].ability.name;

      createPokemon.ability_two = newPokemon.abilities[ability_two - 1].ability.name;

      return createPokemon;

    });

    res.status(200).send({ count: preparePokemons.length, pokemons: preparePokemons });

  } catch (error) {

    console.log(error);

  };

};

module.exports = { listPokemons };