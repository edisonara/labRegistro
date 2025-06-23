require("dotenv").config();
const { validatePractica } = require("../validations/practicaSchema");
const servicio = require("../services/practicaService");
const response = require("../utils/response");

module.exports.create = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { error } = validatePractica(data);
    if (error) return response(400, { mensaje: error.details[0].message });
    const result = await servicio.crearPractica(data);
    return response(201, result);
  } catch (err) {
    return response(500, {
      error: "Error al crear práctica",
      detalle: err.message,
    });
  }
};

module.exports.getAll = async () => {
  try {
    const result = await servicio.obtenerPracticas();
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al obtener prácticas",
      detalle: err.message,
    });
  }
};

module.exports.getById = async (event) => {
  try {
    const id = event.pathParameters.id;
    const result = await servicio.obtenerPracticaPorId(id);
    if (!result) return response(404, { mensaje: "Práctica no encontrada" });
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al obtener práctica",
      detalle: err.message,
    });
  }
};

module.exports.update = async (event) => {
  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    const { error } = validatePractica(data);
    if (error) return response(400, { mensaje: error.details[0].message });
    const result = await servicio.actualizarPractica(id, data);
    return response(200, result);
  } catch (err) {
    return response(500, {
      error: "Error al actualizar práctica",
      detalle: err.message,
    });
  }
};

module.exports.delete = async (event) => {
  try {
    const id = event.pathParameters.id;
    await servicio.eliminarPractica(id);
    return response(200, { mensaje: "Práctica eliminada correctamente" });
  } catch (err) {
    return response(500, {
      error: "Error al eliminar práctica",
      detalle: err.message,
    });
  }
};