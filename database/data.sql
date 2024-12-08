INSERT INTO roles (nombre, descripcion) VALUES 
('Administrador', 'Tiene acceso completo a todas las funcionalidades del sistema'),
('Usuario', 'Tiene acceso limitado a las funcionalidades generales'),
('Tecnico', 'Acceso a funcionalidades técnicas y soporte del sistema');

INSERT INTO usuarios (nombre, apellidopaterno, apellidomaterno, correo, id_rol) VALUES
('Miguel Angel', 'Cordero', 'Cebreros', 'lavanderiamiguel13@gmail.com', 1);

INSERT INTO estados (nombre, descripcion) VALUES
('Solicitado', 'Estado donde se ha solicitado una acción o intervención.'),
('Asignado', 'Estado donde el problema ha sido asignado a un responsable.'),
('En Proceso', 'Estado donde la incidencia está siendo atendida o resuelta.'),
('Terminado', 'Estado donde la incidencia ha sido resuelta y cerrada.'),
('Liberado', 'Estado donde la incidencia ha sido resuelta y cerrada.');


INSERT INTO prioridades (nombre, descripcion) VALUES
('Sin Asignar', 'Estado donde la prioridad no ha sido definida o asignada.'),
('Baja', 'Prioridad baja, generalmente para tareas o problemas de poca urgencia.'),
('Media', 'Prioridad media, para tareas o problemas con un nivel de urgencia moderado.'),
('Alta', 'Prioridad alta, para tareas o problemas que requieren atención urgente.'),
('Crítica', 'Prioridad crítica, para tareas o problemas de extrema urgencia y alta prioridad.');

INSERT INTO departamentos (nombre) VALUES 
    ('Desarrollo de Software'),
    ('Soporte Técnico'),
    ('Recursos Humanos'),
    ('Ventas y Marketing'),
    ('Finanzas'),
    ('Operaciones'),
    ('Investigación y Desarrollo'),
    ('IT y Seguridad');
    
INSERT INTO edificios (nombre, id_departamento) VALUES 
    ('Cubículo de Desarrollo A', 1), -- Desarrollo de Software
    ('Cubículo de Desarrollo B', 1), -- Desarrollo de Software
    ('Cubículo de Soporte A', 2), -- Soporte Técnico
    ('Cubículo de Soporte B', 2), -- Soporte Técnico
    ('Cubículo de Recursos Humanos', 3), -- Recursos Humanos
    ('Cubículo de Ventas A', 4), -- Ventas y Marketing
    ('Cubículo de Ventas B', 4), -- Ventas y Marketing
    ('Cubículo de Finanzas', 5), -- Finanzas
    ('Cubículo de Operaciones', 6), -- Operaciones
    ('Cubículo de Innovación A', 7), -- Investigación y Desarrollo
    ('Cubículo de Innovación B', 7), -- Investigación y Desarrollo
    ('Cubículo de Seguridad IT', 8), -- IT y Seguridad
    ('Cubículo de Redes', 8); -- IT y Seguridad
    
    INSERT INTO equipos (
    nombre, 
    marca, 
    modelo, 
    tipo_equipo, 
    sistema_operativo, 
    capacidad, 
    fecha_adquisicion, 
    estado, 
    id_edificio, 
    fecha_ultimo_mantenimiento
) VALUES (
    'Servidor Principal',          -- Nombre del equipo
    'Dell',                        -- Marca del equipo
    'PowerEdge R740',              -- Modelo
    'Servidor',                    -- Tipo de equipo
    'Windows Server 2019',         -- Sistema operativo
    256,                           -- Capacidad en GB
    '2023-06-15',                  -- Fecha de adquisición
    'En uso',                      -- Estado
    1,                             -- ID del edificio (asegúrate de que exista en la tabla edificios)
    '2024-01-10'                   -- Fecha del último mantenimiento
);

