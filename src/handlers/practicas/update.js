const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const { parcialId, practicaId } = event.pathParameters;
  const data = JSON.parse(event.body);

  try {
    await db.update({
      TableName: TABLE_NAME,
      Key: { PK: `PARCIAL#${parcialId}`, SK: `PRACTICA#${practicaId}` },
      UpdateExpression: 'set #nombre = :nombre, #nota = :nota, #estudiante = :estudiante',
      ExpressionAttributeNames: {
        '#nombre': 'nombre',
        '#nota': 'nota',
        '#estudiante': 'estudiante',
      },
      ExpressionAttributeValues: {
        ':nombre': data.nombre,
        ':nota': data.nota,
        ':estudiante': data.estudiante,
      },
      ReturnValues: 'ALL_NEW',
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Práctica actualizada' }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
