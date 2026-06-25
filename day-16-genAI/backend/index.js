import "dotenv/config"
import readline, { createInterface } from "readline/promises";
import { ChatMistralAI, MistralAI } from "@langchain/mistralai";
import {createAgent, HumanMessage,tool} from 'langchain'
import { senEmail } from "./mail.service.js";
import z from "zod"

const emailTool = tool(senEmail,{
  name: "emailTool",
  description: "use this tool to send email",
  schema: z.object({
    to: z.string().describe("the recipient email address"),
    html: z.string().describe("HTML content of email"),
    subject: z.string().describe("the subject of email"),
  }),
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
    model:"mistral-small-latest",

})

const agent = createAgent({
  model,
  tools:[emailTool]
})

let messages = []

while (true) {
  const userInput = await rl.question("\n🧑 You: ");

  if (userInput.toLowerCase() === "exit") {
    console.log("\n👋 Goodbye!");
    break;
  }

  messages.push(new HumanMessage(userInput))

  const response = await agent.invoke({messages});

  messages.push(response.messages[response.messages.length-1])

  console.log("\n🤖 Assistant:");
  console.log("────────────────────────────────────");
  console.log(response);
  console.log("────────────────────────────────────");
}


