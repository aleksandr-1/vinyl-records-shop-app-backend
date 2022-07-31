create table if not exists products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	author text not null,
	description text,
	price integer
);

create table if not exists stocks (
	id uuid not null default uuid_generate_v4() primary key,
	product_id uuid not null,
	count integer not null,
	foreign key (product_id)  references products(id)
);


create extension if not exists "uuid-ossp";

insert into products (title, author, price) values ('Dark Side of the Moon', 'Pink Floyd',40);
insert into products (title, author, price) values ('Revolver', 'The Beatles',35);
insert into products (title, author, price) values ('Waiting for the Sun', 'The Doors', 45);
insert into products (title, author, price) values ('Cosmo`s Factory', 'Creedence Clearwater Revival', 30);
insert into products (title, author, price) values ('Surrealistic Pillow', 'Jefferson Airplane', 30);


insert into stocks (product_id, count) values ('7af24d30-5636-486f-a5d0-f2dc126109f2', 8);
insert into stocks (product_id, count) values ('edf4f5d8-085f-4e1b-b2e3-fb200bd62a2d', 12);
insert into stocks (product_id, count) values ('0294520f-0b19-4cb5-a51e-70b1764745c6', 3);
insert into stocks (product_id, count) values ('7640a7f2-d24f-4fef-b5a0-f8fedf500372', 7);
insert into stocks (product_id, count) values ('27986502-ba70-4833-98d4-d18c65fb4a48', 5);
