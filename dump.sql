create table clientes (
    id serial primary key,
    nome text not null,
    email text not null unique,
    telefone text
);

create table produtos (
    id serial primary key,
    nome text not null,
    descricao text,
    valor integer not null
);

CREATE TABLE vendas (
    id serial PRIMARY KEY,
    cliente_id integer NOT NULL REFERENCES clientes(id),
    produto_id integer NOT NULL REFERENCES produtos(id),
    quantidade integer NOT NULL,
    transacao_id text
);