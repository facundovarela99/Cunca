DROP DATABASE IF EXISTS cunca;

CREATE DATABASE cunca;

USE cunca;

CREATE TABLE jugadores (id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(100) NOT NULL UNIQUE, contrasenia VARCHAR(100) NOT NULL, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL UNIQUE);

CREATE TABLE cartas (id INT PRIMARY KEY AUTO_INCREMENT, palo VARCHAR(20) NOT NULL, numero INT, letra VARCHAR(10), color VARCHAR(20) NOT NULL);

CREATE TABLE partidas (id INT PRIMARY KEY, cantidad_jugadores INT NOT NULL, tiempo TIME, ganador INT, puntaje_ganador INT); 


CREATE TABLE puntajes (id INT PRIMARY KEY, puntaje INT);

CREATE TABLE mazos (id INT PRIMARY KEY, cantidad_cartas INT, vacio TINYINT);

CREATE TABLE jugadores_x_cartas (id_jugador INT, id_carta INT, PRIMARY KEY (id_jugador, id_carta), FOREIGN KEY (id_jugador) REFERENCES  jugadores(id), FOREIGN KEY (id_carta) REFERENCES cartas(id));

CREATE TABLE mazos_x_cartas (id_mazo INT, id_carta INT, FOREIGN KEY (id_mazo) REFERENCES mazos(id), FOREIGN KEY (id_carta) REFERENCES cartas(id));

CREATE TABLE puntajes_x_jugadores (id_puntaje  INT, id_jugador INT, FOREIGN KEY (id_puntaje) REFERENCES puntajes(id), FOREIGN KEY (id_jugador) REFERENCES jugadores(id));

CREATE TABLE partida_x_jugadores (id_partida INT, id_jugador INT, FOREIGN KEY (id_partida) REFERENCES partidas(id), FOREIGN KEY (id_jugador) REFERENCES jugadores(id));

-- INSERTAR JUGADORES

INSERT INTO jugadores(username, contrasenia, nombre, apellido, correo) VALUES
('facundovarela99', 'PedroMayo123', 'Facundo', 'Varela', 'facundovarela88@hotmail.com'),
('federicoHernandez82', 'PedroMayo123', 'Federico', 'Hernandez', 'fake1@correo.com'),
('Lupite123', 'Bilcha1234', 'Anacleta', 'Sanchez', 'fake2@correo.com'),
('BanzaiPushe4', 'Sapo1234', 'Robert', 'Ñuñez', 'fake3@correo.com');


-- INSERTAR CARTAS (siempre son las mismas)

INSERT INTO cartas (palo, numero, letra, color) VALUES
-- Corazones (Rojo)
('Corazones', 1, 'A', 'Rojo'),
('Corazones', 2, '2', 'Rojo'),
('Corazones', 3, '3', 'Rojo'),
('Corazones', 4, '4', 'Rojo'),
('Corazones', 5, '5', 'Rojo'),
('Corazones', 6, '6', 'Rojo'),
('Corazones', 7, '7', 'Rojo'),
('Corazones', 8, '8', 'Rojo'),
('Corazones', 9, '9', 'Rojo'),
('Corazones', 10, '10', 'Rojo'),
('Corazones', 11, 'J', 'Rojo'),
('Corazones', 12, 'Q', 'Rojo'),
('Corazones', 13, 'K', 'Rojo'),

-- Diamantes (Rojo)
('Diamantes', 1, 'A', 'Rojo'),
('Diamantes', 2, '2', 'Rojo'),
('Diamantes', 3, '3', 'Rojo'),
('Diamantes', 4, '4', 'Rojo'),
('Diamantes', 5, '5', 'Rojo'),
('Diamantes', 6, '6', 'Rojo'),
('Diamantes', 7, '7', 'Rojo'),
('Diamantes', 8, '8', 'Rojo'),
('Diamantes', 9, '9', 'Rojo'),
('Diamantes', 10, '10', 'Rojo'),
('Diamantes', 11, 'J', 'Rojo'),
('Diamantes', 12, 'Q', 'Rojo'),
('Diamantes', 13, 'K', 'Rojo'),

-- Tréboles (Negro)
('Tréboles', 1, 'A', 'Negro'),
('Tréboles', 2, '2', 'Negro'),
('Tréboles', 3, '3', 'Negro'),
('Tréboles', 4, '4', 'Negro'),
('Tréboles', 5, '5', 'Negro'),
('Tréboles', 6, '6', 'Negro'),
('Tréboles', 7, '7', 'Negro'),
('Tréboles', 8, '8', 'Negro'),
('Tréboles', 9, '9', 'Negro'),
('Tréboles', 10, '10', 'Negro'),
('Tréboles', 11, 'J', 'Negro'),
('Tréboles', 12, 'Q', 'Negro'),
('Tréboles', 13, 'K', 'Negro'),

-- Picas (Negro)
('Picas', 1, 'A', 'Negro'),
('Picas', 2, '2', 'Negro'),
('Picas', 3, '3', 'Negro'),
('Picas', 4, '4', 'Negro'),
('Picas', 5, '5', 'Negro'),
('Picas', 6, '6', 'Negro'),
('Picas', 7, '7', 'Negro'),
('Picas', 8, '8', 'Negro'),
('Picas', 9, '9', 'Negro'),
('Picas', 10, '10', 'Negro'),
('Picas', 11, 'J', 'Negro'),
('Picas', 12, 'Q', 'Negro'),
('Picas', 13, 'K', 'Negro');


-- PRE SALAS

CREATE TABLE presalas (id INT PRIMARY KEY AUTO_INCREMENT, cantidad_jugadores INT, cantidad_listos INT);

-- TABLA INTERMEDIA jugadores y presalas (el id del jugador debe ser único, el mismo no puede repetirse en una misma sala)

CREATE TABLE presalas_x_jugadores (id_presala INT, id_jugador INT, PRIMARY KEY (id_presala, id_jugador), FOREIGN KEY(id_presala) REFERENCES presalas(id), FOREIGN KEY(id_jugador) REFERENCES jugadores(id));

-- INSERTAR PRE SALAS POR DEFAULT

INSERT INTO presalas (cantidad_jugadores, cantidad_listos) VALUES
(0, 0),
(0, 0),
(0, 0);

-- A PARTIR DE AQUÍ COMIENZAN LAS CONSULTAS DE TESTEO (NO OBLIGATORIAS AL RECREAR LA BASE)

INSERT INTO presalas_x_jugadores (id_presala, id_jugador) VALUES (1, 5);

-- SELECCIONAR EL ID, USERNAME DE JUGADORES Y PRE SALAS EN LAS QUE SE ENCUENTRAN

SELECT jugadores.id AS idJugador, jugadores.username AS nombreUsuario, presalas.id AS idPresala FROM  jugadores JOIN presalas_x_jugadores ON jugadores.id = presalas_x_jugadores.id_jugador JOIN presalas ON presalas.id = presalas_x_jugadores.id_presala WHERE id_presala = 1; 