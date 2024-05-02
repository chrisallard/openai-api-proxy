import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Give me a common 7 letter word in Spanish and 2 words, as an array, that rhyme with it to output JSON.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
}

main();
