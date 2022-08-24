create schema pokemon

/* Crianção de enum para o campo role */
create type pokemon.enum_role as enum(
	'user', 
	'admin', 
	'moderator'
)

create table pokemon.roles(
	id uuid primary key,
	name pokemon.enum_role not null,
	date timestamp default now() not null
)

create table pokemon.user_roles(
	id uuid primary key,
	role_id uuid not null,
	user_id uuid not null,
	date timestamp default now() not null
)

create table pokemon.users(
    id uuid primary key,
    name text not null,
    password text not null,
    email text not null,
    date timestamp default now() not null
)

create table pokemon.pokemons(
    id uuid primary key,
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
    date timestamp default now() not null
)

create table pokemon.user_pokemons(
    id uuid primary key, 
    user_id uuid not null,
    pokemon_id uuid not null,
    date timestamp default now() not null
)

/*CONSTRAINT - user_id e user_pokemons */
alter table pokemon.user_pokemons 
add constraint pokemons_user_id_fk 
foreign key (user_id) references pokemon.users(id)

/*CONSTRAINT - pokemon_id e user_pokemons */
alter table pokemon.user_pokemons 
add constraint pokemons_pokemon_id_fk 
foreign key (pokemon_id) references pokemon.pokemons(id)

/*CONSTRAINT - role_id e user_roles */
alter table pokemon.user_roles 
add constraint roles_role_id_fk 
foreign key (role_id) references pokemon.roles(id)

/*CONSTRAINT - user_id e user_roles */
alter table pokemon.user_roles 
add constraint roles_user_id_fk 
foreign key (user_id) references pokemon.users(id)