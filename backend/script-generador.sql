create table product_type
(
    id   int auto_increment
        primary key,
    name varchar(100) not null
);

create table product
(
    id              int auto_increment
        primary key,
    name            varchar(200)   not null,
    description     varchar(100)   not null,
    price           decimal(10, 2) not null,
    product_type_id int            null,
    image           varchar(500)   null,
    constraint product_ibfk_1
        foreign key (product_type_id) references product_type (id)
);

create index product_type_id
    on product (product_type_id);

create table user
(
    id       int auto_increment
        primary key,
    name     varchar(255) not null,
    surname  varchar(255) not null,
    password varchar(255) not null,
    address  varchar(500) not null,
    email    varchar(320) null,
    constraint email
        unique (email)
);

create table `order`
(
    id      int auto_increment
        primary key,
    total   decimal(10, 2) not null,
    user_id int            not null,
    constraint order_ibfk_1
        foreign key (user_id) references user (id)
);

create index user_id
    on `order` (user_id);

create table product_order
(
    product_id int not null,
    order_id   int not null,
    primary key (product_id, order_id),
    constraint product_order_ibfk_1
        foreign key (product_id) references product (id),
    constraint product_order_ibfk_2
        foreign key (order_id) references `order` (id)
);

create index order_id
    on product_order (order_id);




insert into product_type (id, name)
values  (1, 'Alimento'),
        (2, 'Frutas'),
        (3, 'Verduras');

insert into product (id, name, description, price, product_type_id, image)
values  (1, 'Pan de Molde', 'pan rectangular. Utilizado para preparar sándwiches, tostadas y otras recetas.', 999.99, 1, 'http://localhost:8080/public/assets/productos/naranjas.jpg'),
        (2, 'Manzana', 'Una deliciosa manzana roja', 255.99, 2, 'http://localhost:8080/public/assets/productos/naranjas.jpg'),
        (3, 'Plátano', 'Un plátano', 100.79, 2, 'http://localhost:8080/public/assets/productos/naranjas.jpg'),
        (4, 'Zanahoria', 'Una zanahoria fresca', 30.99, 3, 'http://localhost:8080/public/assets/productos/naranjas.jpg'),
        (5, 'Lechuga', 'Una lechuga fresca', 250.49, 3, 'http://localhost:8080/public/assets/productos/naranjas.jpg'),
        (6, 'Naranja', 'Una naranja llena de vitamina C', 44.89, 2, 'http://localhost:8080/public/assets/productos/naranjas.jpg');


alter table user add column confirmationCode varchar(255);

alter table user add column status boolean;