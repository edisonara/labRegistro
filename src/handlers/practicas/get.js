const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const { parcialId, practicaId } = event.pathParameters;

  try {
    const result = await db.get({
      TableName: TABLE_NAME,
      Key: { PK: `PARCIAL#${parcialId}`, SK: `PRACTICA#${practicaId}` },
    }).promise();

    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Práctica no encontrada' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
