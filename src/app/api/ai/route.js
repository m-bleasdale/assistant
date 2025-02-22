import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prompt } from "./config";
import Reply from "./Reply";
import Action from "./Action";

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    { 
        model: "gemini-2.0-flash",
        systemInstruction: {
            parts: prompt
        }
    }
);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const key = process.env.GEMINI_API_KEY;
if (!key) throw new Error("Missing API key at /api/ai");


export async function POST(req) {
    if (req.method !== "POST") return NextResponse.json({ error: "Must be POST" }, { status: 405 });

    const { message, previousMessages } = await req.json();

    try {
        const chat = model.startChat({
            history: [
                ...previousMessages
            ],
            generationConfig: generationConfig
        });

        const userMessage = `${message} <MessageDate>${new Date()}</MessageDate>`;

        let response = await chat.sendMessage(userMessage);
        let reply = new Reply(response.response.candidates[0].content.parts[0].text);
        if(reply.status !== "success") return NextResponse.json({ error: "Error parsing assistant response", error_message: reply.error }, { status: 500 });

        console.log(reply.actions);

        if(reply.actions !== null && reply.actions !== undefined)
        {
            reply.actions.forEach(actionElement => {
                const action = new Action(actionElement);
                console.log(actionElement);
            });
        }

        return NextResponse.json({text: reply.text, actions: reply.actions});
        
    }
    catch (error){
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed 500" }, { status: 500 });
    }

}