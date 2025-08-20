import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "Todo";

export async function scanTodos() {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const response = await docClient.send(command);
  return response.Items || [];
}

export async function createTodo(item) {
  const command = new PutCommand({ TableName: TABLE_NAME, Item: item });
  await docClient.send(command);
  return item;
}
