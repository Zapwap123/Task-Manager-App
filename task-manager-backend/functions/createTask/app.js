const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const task = {
    taskId: uuidv4(),
    title: body.title,
    description: body.description,
    assignedTo: body.assignedTo,
    status: 'Pending',
    deadline: body.deadline,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamoDb.put({
      TableName: process.env.TABLE_NAME,
      Item: task,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Task created', task }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create task', details: err }),
    };
  }
};
