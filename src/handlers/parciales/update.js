const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const parcialId = event.pathParameters.parcialId;
  const data = JSON.parse(event.body);

  try {
    await db.update({
      TableName: TABLE_NAME,
      Key: { PK: `PARCIAL#${parcialId}`, SK: 'METADATA' },
      UpdateExpression: 'set #nombre = :nombre, #fecha = :fecha, #docente = :docente',
      ExpressionAttributeNames: {
        '#nombre': 'nombre',
        '#fecha': 'fecha',
        '#docente': 'docente',
      },
      ExpressionAttributeValues: {
        ':nombre': data.nombre,
        ':fecha': data.fecha,
        ':docente': data.docente,
      },
      ReturnValues: 'ALL_NEW',
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Parcial actualizado' }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
