import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";

const client = new SSMClient();

export const handler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  const client = new SSMClient();
  const input = {
    Name: "/wordal/openai-api-key",
    WithDecryption: false,
  };

  const command = new GetParameterCommand(input);
  const response = await client.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
