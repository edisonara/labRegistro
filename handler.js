'use strict';

module.exports.bienvenida = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        mensaje: '¡Bienvenido al Sistema de Gestión de Laboratorios!',
        descripcion: 'API RESTful para el registro y gestión de uso de laboratorios',
        version: '1.0.0',
        estado: 'En desarrollo',
        endpoints: {
          documentacion: '/docs',
          laboratorios: '/laboratorios',
          reservas: '/reservas'
        }
      },
      null,
      2
    ),
  };
};
