import { Configuration, OpenAIApi } from "openai";

//open ai

const configuration = new Configuration({
  apiKey: "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",
});
const api = new OpenAIApi(configuration);

const GenerateCompletion = async () => {
  const res = await api.createCompletion({
    model: "text-davinci-003",
    prompt: "how to add two numbers in kotlin",
    max_tokens: 100,
    temperature: 0,
  });

  //AI model for code completion add
  return <div>{console.log(res.data.choices[0].text)}</div>;
};

export default GenerateCompletion;
