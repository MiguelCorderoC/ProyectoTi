CREATE DATABASE gestiondata;

USE gestiondata;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    descripcion VARCHAR(100)
);

CREATE TABLE departamentos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30)
);

CREATE TABLE estados (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100)
); 

CREATE TABLE prioridades (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellidopaterno VARCHAR(30),
    apellidomaterno VARCHAR(30),
    correo VARCHAR(100) UNIQUE,
    id_rol INT,
    CONSTRAINT fk_roles FOREIGN KEY (id_rol) REFERENCES roles(id)
);

CREATE TABLE edificios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    id_departamento INT,
	CONSTRAINT fk_edificio_departamento FOREIGN KEY (id_departamento) REFERENCES departamentos(id) 
);

CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),                -- Nombre del equipo (Ej: Computadora, Servidor, Cable, etc.)
    marca VARCHAR(30),                 -- Marca del equipo (Ej: Dell, HP, Cisco, etc.)
    modelo VARCHAR(30),                -- Modelo específico del equipo
    tipo_equipo VARCHAR(30),           -- Tipo de equipo (Ej: Computadora, Servidor, Cable, etc.)
    sistema_operativo VARCHAR(50),     -- Sistema operativo (si aplica) para equipos como computadoras o servidores
    capacidad INT,                     -- Capacidad del equipo (Ej: para servidores: GB de RAM, almacenamiento en discos, etc.)
    fecha_adquisicion DATE,            -- Fecha de adquisición o compra del equipo
    estado VARCHAR(30),                -- Estado del equipo (Ej: Nuevo, En uso, Fuera de servicio, etc.)
    id_edificio INT,                   -- Referencia al edificio donde se encuentra el equipo
    fecha_ultimo_mantenimiento DATE,    -- Fecha del último mantenimiento realizado al equipo
    CONSTRAINT fk_edificio_equipo FOREIGN KEY (id_edificio) REFERENCES edificios(id)
);

CREATE TABLE incidentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    descripcion VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    id_tecnico INT,
    id_usuario INT,
    id_estado INT,
    id_prioridad INT,
    id_equipo INT,
    CONSTRAINT fk_tecnico FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES estados(id),
    CONSTRAINT fk_prioridad FOREIGN KEY (id_prioridad) REFERENCES prioridades(id),
    CONSTRAINT fk_equipo FOREIGN KEY (id_equipo) REFERENCES equipos(id)
);

CREATE TABLE problemas (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100),
    id_tecnico INT,
    id_equipo INT,
	CONSTRAINT fk_tecnico_problema FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
	CONSTRAINT fk_equipo_problema FOREIGN KEY (id_equipo) REFERENCES equipos(id)
);

CREATE TABLE cambios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100),
    id_problema INT,
	CONSTRAINT fk_cambio_problema FOREIGN KEY (id_problema) REFERENCES problemas(id)
);