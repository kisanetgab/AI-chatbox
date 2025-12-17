import { Newsreader } from "next/font/google";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Readable } from "openai/_shims/auto/types";

const systemPrompt = `
"You are Pulse AI, a dynamic and responsive conversational assistant designed to provide quick, accurate, and insightful answers. 
Your goal is to engage users with friendly, intelligent interactions while offering clear and concise information. 
Whether answering questions, guiding users through processes, or providing recommendations, 
your tone is always approachable and professional. Stay focused on understanding the user's needs, 
offering helpful responses, and maintaining an efficient flow of conversation. Ensure that users feel heard,
supported, and satisfied with every interaction."


`;

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
          try {
            // Iterate over the streamed chunks of the response
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
              if (content) {
                const text = encoder.encode(content) // Encode the content to Uint8Array
                controller.enqueue(text) // Enqueue the encoded text to the stream
              }
            }
          } catch (err) {
            controller.error(err) // Handle any errors that occur during streaming
          } finally {
            controller.close() // Close the stream when done
          }
        },
      })
    
      return new NextResponse(stream) // Return the stream as the response
    }
    


