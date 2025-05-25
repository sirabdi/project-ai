import OpenAI from "openai";

const openai = new OpenAI();

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are helpful chatbot",
  },
];

async function createChatCompetion() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: context,
  });
  const resposeMessage = response.choices[0].message;
  context.push(resposeMessage);
  console.log(
    `${response.choices[0].message.role}: ${response.choices[0].message.content}`
  );
}

process.stdin.addListener("data", async function (input) {
  const userInput = input.toString().trim();
  context.push({
    role: "user",
    content: userInput,
  });
  await createChatCompetion();
  //   console.log(response.choices[0].message.content);
});
