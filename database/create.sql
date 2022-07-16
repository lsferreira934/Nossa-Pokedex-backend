create schema pokemon

create table pokemon.users(
    id text primary key,
    name text not null,
    password text not null,
    email text not null,
    date timestamp default now()
)

create table pokemon.pokemons(
    id text primary key,
    pokeapi_id text not null,
    name text not null,
    hp integer not null,
    attack integer not null,
    defense integer not null,
    special_attack integer not null,
    special_defense integer not null,
    speed integer not null,
    type_one text,
    type_two text,
    sprite text not null,
    ability_one text,
    ability_two text,
    date timestamp default now()
)

create table pokemon.user_pokemons(
    id text primary key, 
    user_id text not null,
    pokemon_id text not null,
    date timestamp default now()
)

alter table pokemon.user_pokemons 
add constraint pokemons_user_id_fk 
foreign key (user_id) references pokemon.users(id)

alter table pokemon.user_pokemons 
add constraint pokemons_pokemon_id_fk 
foreign key (pokemon_id) references pokemon.pokemons(id)