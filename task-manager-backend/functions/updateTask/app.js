const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const taskId = event.pathParameters.taskId;
  const body = JSON.parse(event.body);

  const updateParams = {
    TableName: process.env.TABLE_NAME,
    Key: { taskId },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: {
      ':status': body.status || 'Pending',
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(updateParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task updated', task: result.Attributes }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update task', details: err }),
    };
  }
};
