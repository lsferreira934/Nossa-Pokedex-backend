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
	date timestamp default now() not null,
    constraint roles_role_id_fk foreign key (role_id) references pokemon.roles(id),
    constraint roles_user_id_fk foreign key (user_id) references pokemon.users(id)
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
    date timestamp default now() not null,
    constraint pokemons_user_id_fk foreign key (user_id) references pokemon.users(id),
    constraint pokemons_pokemon_id_fk foreign key (pokemon_id) references pokemon.pokemons(id)
)

create table pokemon.blacklist_token(
	id uuid primary key,
	user_id uuid not null,
	token text not null,
	date timestamp default now() not null,
	constraint toke_user_id_fk foreign key (user_id) references pokemon.users(id)
)


/* Insert ROLES */
insert into pokemon.roles (id, name) values('1566f6cb-4f4e-46b4-96d1-8dce8461e401', 'user'), ('31d062bf-9879-4361-8875-654cbce98039', 'admin'),('da91c255-4d13-497a-ab71-743e6224eada', 'moderator')


