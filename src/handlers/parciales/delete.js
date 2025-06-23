const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const parcialId = event.pathParameters.parcialId;

  try {
    await db.delete({
      TableName: TABLE_NAME,
      Key: { PK: `PARCIAL#${parcialId}`, SK: 'METADATA' },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Parcial eliminado' }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
