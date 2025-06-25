// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

export default async function main(item_info) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAkRdh4G-BviMrExUIggQKNuZWVauIrAus",
  });

  const contents = [{ role: "user", parts: [{ text: item_info }] }];
  const config = {
    temperature: 1.5,
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: `You are a sustainability expert AI helping e-commerce platforms assess environmental impact.

Instructions:
- For a given product category (like "clothing", "electronics", "furniture"), calculate the average CO2 generated per item in that category.
- Compare the product's own CO2 value with the average to assign an eco rating.

Eco Rating Logic:
- 5 if generated CO2 < 50% of category average.
- 4 if 50–90% of category average.
- 3 if within ±10% of average.
- 2 if 10–50% above average.(Here eco rating has to be 0)
- 1 if > 50% above average. (Here eco rating has to be 0)
- 0 if > 70 % above average.(Here eco rating has to be 0)


Return JSON only in the format:

{
  "average_co2": number,
  "generated_co2": number,
  "eco_rating": string
}

Do not include any explanation or notes.`,
      },
    ],
  };
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash-lite",
    config,
    contents,
  });
  let responseText = "";
  for await (const chunk of response) {
    responseText += chunk.text;
  }
  console.log(responseText);
  return responseText;
  //   const ai = new GoogleGenAI({
  //     apiKey: process.env.GEMINI_API_KEY,
  //   });
  //   const config = {
  //     temperature: 1.5,
  //     thinkingConfig: {
  //       thinkingBudget: 0,
  //     },
  //     responseMimeType: 'text/plain',
  //     systemInstruction: [
  //         {
  //           text: `You are a sustainability expert AI helping e-commerce platforms assess environmental impact.

  // Instructions:
  // - For a given product category (like "clothing", "electronics", "furniture"), calculate the average CO2 generated per item in that category.
  // - Compare the product's own CO2 value with the average to assign an eco rating.

  // Eco Rating Logic:
  // - 5 if generated CO2 < 50% of category average.
  // - 4 if 50–90% of category average.
  // - 3 if within ±10% of average.
  // - 2 if 10–50% above average.
  // - 1 if > 50% above average.

  // Return JSON only in the format:

  // {
  //   "average_co2": number,
  //   "generated_co2": number,
  //   "eco_rating": string
  // }

  // Do not include any explanation or notes.`,
  //         }
  //     ],
  //   };
  //   const model = 'gemini-2.5-flash-lite-preview-06-17';
  //   const contents = [
  //     {
  //       role: 'user',
  //       parts: [
  //         {
  //           text: item_info,
  //         },
  //       ],
  //     },
  //   ];

  //   const response = await ai.models.generateContentStream({
  //     model,
  //     config,
  //     contents,
  //   });
  //   console.log(response)
  //   let fileIndex = 0;
  //   for await (const chunk of response) {
  //     console.log(chunk.text);
  //   }
}
