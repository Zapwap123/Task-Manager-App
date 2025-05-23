const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    const result = await dynamoDb.scan({
      TableName: process.env.TABLE_NAME,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve tasks', details: err }),
    };
  }
};
