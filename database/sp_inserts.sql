DELIMITER $$

CREATE OR REPLACE PROCEDURE sp_insert_usuario(
    IN p_nombre VARCHAR(30),
    IN p_apellidopaterno VARCHAR(30),
    IN p_apellidomaterno VARCHAR(30),
    IN p_correo VARCHAR(100),
    IN p_id_rol INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE correo = p_correo) THEN
        INSERT INTO usuarios (nombre, apellidopaterno, apellidomaterno, correo, id_rol)
        VALUES (p_nombre, p_apellidopaterno, p_apellidomaterno, p_correo, p_id_rol);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo ya está registrado.';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE OR REPLACE PROCEDURE sp_insert_equipo (
    IN p_nombre VARCHAR(30),
    IN p_marca VARCHAR(30),
    IN p_modelo VARCHAR(30),
    IN p_sistema_operativo VARCHAR(50),
    IN p_capacidad INT,
    IN p_fecha_adquisicion DATE,
    IN p_id_edificio INT
)
BEGIN
    INSERT INTO equipos (
        nombre, 
        marca, 
        modelo, 
        sistema_operativo, 
        capacidad, 
        fecha_adquisicion, 
        id_edificio
    ) VALUES (
        p_nombre, 
        p_marca, 
        p_modelo, 
        p_sistema_operativo, 
        p_capacidad, 
        p_fecha_adquisicion, 
        p_id_edificio
    );

END$$

DELIMITER ;

DELIMITER $$

CREATE OR REPLACE PROCEDURE sp_insert_incidente(
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100),
    IN p_id_usuario INT,
    IN p_id_equipo INT
)
BEGIN
    INSERT INTO incidentes (
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id_tecnico,
        id_usuario,
        id_estado,
        id_prioridad,
        id_equipo
    )
    VALUES (
        p_nombre,
        p_descripcion,
        NOW(), -- Fecha actual con hora
        NULL,  -- Fecha fin será NULL por defecto
        1,     -- Técnico con ID 1
        p_id_usuario,
        1,     -- Estado con ID 1
        1,     -- Prioridad con ID 1
        p_id_equipo
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_asignar_incidente(
    IN p_id_incidente INT,
    IN p_id_tecnico INT,
    IN p_id_prioridad INT
)
BEGIN
    UPDATE incidentes
    SET 
        id_estado = 2,       -- Establece el estado a 2
        id_prioridad = p_id_prioridad,   -- Actualiza la prioridad
        id_tecnico = p_id_tecnico      -- Actualiza el técnico
    WHERE id = p_id_incidente;          -- Filtra el incidente por su ID
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_comenzar_incidente (
    IN incidente_id INT
)
BEGIN
    UPDATE incidentes
    SET id_estado = 3
    WHERE id = incidente_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_terminar_incidente (
    IN incidente_id INT
)
BEGIN
    UPDATE incidentes
    SET id_estado = 4
    WHERE id = incidente_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE OR REPLACE PROCEDURE sp_liberar_incidente (
    IN incidente_id INT
)
BEGIN
    UPDATE incidentes
    SET id_estado = 5, fecha_fin = NOW()
    WHERE id = incidente_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_insert_problema(
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100),
    IN p_id_tecnico INT,
    IN p_id_equipo INT
)
BEGIN
    INSERT INTO problemas (nombre, descripcion, id_tecnico, id_equipo)
    VALUES (p_nombre, p_descripcion, p_id_tecnico, p_id_equipo);
END$$

DELIMITER ;

 INSERT INTO problemas (nombre, descripcion, id_tecnico, id_equipo)
    VALUES ('Fallas constantes', 'Fallas en el display, no enciende', 2, 1);
    
    
DELIMITER //

CREATE PROCEDURE sp_insert_cambio (
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100),
    IN p_id_problema INT
)
BEGIN
        INSERT INTO cambios (nombre, descripcion, id_problema)
        VALUES (p_nombre, p_descripcion, p_id_problema);
END //

DELIMITER ;
