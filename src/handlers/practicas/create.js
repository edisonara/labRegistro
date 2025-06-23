const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const parcialId = event.pathParameters.parcialId;
  try {
    const data = JSON.parse(event.body);
    const id = uuidv4();

    const item = {
      PK: `PARCIAL#${parcialId}`,
      SK: `PRACTICA#${id}`,
      ...data,
    };

    await db.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Practica creada', id }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
