require("dotenv").config();
const { validateParcial } = require("../validations/parcialSchema");
const servicio = require("../services/parcialService");
const response = require("../utils/response");

module.exports.create = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { error } = validateParcial(data);
    if (error) return response(400, { mensaje: error.details[0].message });
    const result = await servicio.crearParcial(data);
    return response(201, result);
  } catch (err) {
    return response(500, {
      error: "Error al crear parcial",
      detalle: err.message,
    });
  }
};

module.exports.getAll = async () => {
  try {
    const result = await servicio.obtenerParciales();
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al obtener parciales",
      detalle: err.message,
    });
  }
};

module.exports.getById = async (event) => {
  try {
    const asignaturaId = event.pathParameters.asignaturaId;
    const parcialId = event.pathParameters.parcialId;
    const result = await servicio.obtenerParcialPorId(asignaturaId, parcialId);
    if (!result) return response(404, { mensaje: "Parcial no encontrado" });
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al obtener parcial",
      detalle: err.message,
    });
  }
};

module.exports.update = async (event) => {
  try {
    const asignaturaId = event.pathParameters.asignaturaId;
    const parcialId = event.pathParameters.parcialId;
    const data = JSON.parse(event.body);
    const { error } = validateParcial(data);
    if (error) return response(400, { mensaje: error.details[0].message });
    const result = await servicio.actualizarParcial(
      asignaturaId,
      parcialId,
      data
    );
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al actualizar parcial",
      detalle: err.message,
    });
  }
};

module.exports.delete = async (event) => {
  try {
    const asignaturaId = event.pathParameters.asignaturaId;
    const parcialId = event.pathParameters.parcialId;
    await servicio.eliminarParcial(asignaturaId, parcialId);
    return response(200, { mensaje: "Parcial eliminado correctamente" });
  } catch (err) {
    return response(500, {
      error: "Error al eliminar parcial",
      detalle: err.message,
    });
  }
};