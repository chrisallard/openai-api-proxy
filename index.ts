import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";
import OpenAI from "openai";

export const handler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  const response = await getWord();

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      Context: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

const getWord = async () => {
  const client = new SSMClient();
  const input = {
    Name: "/wordal/openai-api-key",
    WithDecryption: false,
  };

  const command = new GetParameterCommand(input);
  const response = await client.send(command);

  const openai = new OpenAI({
    apiKey: response.Parameter.Value,
  });

  const completion = await openai.chat.completions.create({
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Give me a common 5 letter word in English and 2 words, as an array, that rhyme with it to output JSON.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
};
