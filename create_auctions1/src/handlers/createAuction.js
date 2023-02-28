const { v4: uuid } = require("uuid");
const AWS = require("aws-sdk");
const createError = require("http-errors");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require("@middy/core");
const { httpErrorHandler } = require("@middy/http-error-handler");
const { httpEventNormalizer } = require("@middy/http-event-normalizer");
const { httpJsonBodyParser } = require("@middy/http-json-body-parser");

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();
  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };
  try {
    await dynamodb
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: auction,
      })
      .promise();
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = middy(createAuction)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
