const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const parcialId = event.pathParameters.parcialId;

  try {
    const result = await db.get({
      TableName: TABLE_NAME,
      Key: { PK: `PARCIAL#${parcialId}`, SK: 'METADATA' },
    }).promise();

    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Parcial no encontrado' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
