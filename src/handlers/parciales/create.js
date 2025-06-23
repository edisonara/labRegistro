const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const id = uuidv4();

    const item = {
      PK: `PARCIAL#${id}`,
      SK: 'METADATA',
      ...data,
    };

    await db.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Parcial creado', id }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
