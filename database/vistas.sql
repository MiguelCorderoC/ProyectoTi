CREATE VIEW view_usuarios AS
SELECT 
    usuarios.id AS usuario_id,
    usuarios.nombre AS usuario_nombre,
    usuarios.apellidopaterno AS usuario_apellidopaterno,
    usuarios.apellidomaterno AS usuario_apellidomaterno,
    usuarios.correo AS usuario_correo,
    roles.id AS rol_id,
    roles.nombre AS rol_nombre,
    roles.descripcion AS rol_descripcion
FROM 
    usuarios
INNER JOIN 
    roles
ON 
    usuarios.id_rol = roles.id;
    
CREATE VIEW view_equipos AS
SELECT 
    equipos.id AS equipo_id,
    equipos.nombre AS equipo_nombre,
    equipos.marca AS equipo_marca,
    equipos.modelo AS equipo_modelo,
    equipos.tipo_equipo,
    equipos.sistema_operativo,
    equipos.capacidad,
    equipos.fecha_adquisicion,
    equipos.estado AS equipo_estado,
    equipos.fecha_ultimo_mantenimiento,
    edificios.id AS edificio_id,
    edificios.nombre AS edificio_nombre,
    departamentos.id AS departamento_id,
    departamentos.nombre AS departamento_nombre
FROM 
    equipos
INNER JOIN 
    edificios ON equipos.id_edificio = edificios.id
INNER JOIN 
    departamentos ON edificios.id_departamento = departamentos.id;
    
CREATE VIEW view_incidentes AS
SELECT 
    i.id AS incidente_id,
    i.nombre AS incidente_nombre,
    i.descripcion AS incidente_descripcion,
    i.fecha_inicio,
    i.fecha_fin,
    
    -- Información del técnico asignado
    tecnico.id AS tecnico_id,
    CONCAT(tecnico.nombre, ' ', tecnico.apellidopaterno, ' ', tecnico.apellidomaterno) AS tecnico_nombre,
    tecnico.correo AS tecnico_correo,

    -- Información del usuario reportante
    usuario.id AS usuario_id,
    CONCAT(usuario.nombre, ' ', usuario.apellidopaterno, ' ', usuario.apellidomaterno) AS usuario_nombre,
    usuario.correo AS usuario_correo,

    -- Información del estado
    e.id AS estado_id,
    e.nombre AS estado_nombre,
    e.descripcion AS estado_descripcion,

    -- Información de la prioridad
    p.id AS prioridad_id,
    p.nombre AS prioridad_nombre,
    p.descripcion AS prioridad_descripcion,

    -- Información del equipo
    eq.id AS equipo_id,
    eq.nombre AS equipo_nombre,
    eq.marca AS equipo_marca,
    eq.modelo AS equipo_modelo,
    eq.tipo_equipo AS equipo_tipo,
    eq.estado AS equipo_estado,
    eq.fecha_adquisicion,
    eq.fecha_ultimo_mantenimiento,

    -- Información del edificio donde está el equipo
    ed.id AS edificio_id,
    ed.nombre AS edificio_nombre,

    -- Información del departamento del edificio
    d.id AS departamento_id,
    d.nombre AS departamento_nombre

FROM 
    incidentes i
 JOIN usuarios tecnico ON i.id_tecnico = tecnico.id
 JOIN usuarios usuario ON i.id_usuario = usuario.id
 JOIN estados e ON i.id_estado = e.id
 JOIN prioridades p ON i.id_prioridad = p.id
 JOIN equipos eq ON i.id_equipo = eq.id
 JOIN edificios ed ON eq.id_edificio = ed.id
 JOIN departamentos d ON ed.id_departamento = d.id;
 
CREATE VIEW view_problemas AS
SELECT 
    p.id AS problema_id,
    p.nombre AS problema_nombre,
    p.descripcion AS problema_descripcion,
    u.id AS tecnico_id,
    CONCAT(u.nombre, ' ', u.apellidopaterno, ' ', u.apellidomaterno) AS tecnico_nombre,
    e.id AS equipo_id,
    e.nombre AS equipo_nombre,
    e.marca AS equipo_marca,
    e.modelo AS equipo_modelo,
    e.tipo_equipo AS equipo_tipo,
    e.estado AS equipo_estado,
    e.fecha_adquisicion AS equipo_fecha_adquisicion,
    e.fecha_ultimo_mantenimiento AS equipo_fecha_mantenimiento,
    ed.id AS edificio_id,
    ed.nombre AS edificio_nombre,
    d.id AS departamento_id,
    d.nombre AS departamento_nombre
FROM problemas p
LEFT JOIN usuarios u ON p.id_tecnico = u.id
LEFT JOIN equipos e ON p.id_equipo = e.id
LEFT JOIN edificios ed ON e.id_edificio = ed.id
LEFT JOIN departamentos d ON ed.id_departamento = d.id;

CREATE VIEW view_cambios AS
SELECT
    c.id AS cambio_id,
    c.nombre AS cambio_nombre,
    c.descripcion AS cambio_descripcion,
    p.id AS problema_id,
    p.nombre AS problema_nombre,
    p.descripcion AS problema_descripcion,
    e.id AS equipo_id,
    e.nombre AS equipo_nombre,
    e.marca AS equipo_marca,
    e.modelo AS equipo_modelo,
    u.id AS tecnico_id,
    CONCAT(u.nombre, ' ', u.apellidopaterno, ' ', u.apellidomaterno) AS tecnico_nombre_completo
FROM
    cambios c
INNER JOIN
    problemas p ON c.id_problema = p.id
INNER JOIN
    equipos e ON p.id_equipo = e.id
INNER JOIN
    usuarios u ON p.id_tecnico = u.id;
