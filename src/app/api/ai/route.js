import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prompt } from "./config";

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
    console.log(previousMessages);

    try {
        const chat = model.startChat({
            history: [
                ...previousMessages
            ],
            generationConfig: generationConfig
        });

        let reply = await chat.sendMessage(message);
        const replyText = reply.response.candidates[0].content.parts[0].text;
        return NextResponse.json({text: replyText});
        
    }
    catch (error){
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed 500" }, { status: 500 });
    }

}