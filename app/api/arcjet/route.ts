import { NextResponse } from "next/server";
import { aj } from "@/lib/arcjet";

export async function GET(req: Request) {
  const userId = "user123"; // Replace with your authenticated user ID
  const decision = await aj.protect(req, { userId, requested: 5 }); // Deduct 5 tokens from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}


// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   try {
//     const decision = await aj.protect(req, { userId: "user123", requested: 1 });
    
//     if (decision.isDenied()) {
//       return NextResponse.json(
//         { error: "Too Many Requests", reason: decision.reason },
//         { status: 429 },
//       );
//     }

//     const completion = await openai.chat.completions.create({
//       model: 'openai/gpt-4.1-mini',
//       response_format: { type: 'json_object' },
//       messages: messages,
//       max_tokens: 25000, // Added token limit to prevent 402 error
//     });

//     const message = completion.choices[0].message;
//     return NextResponse.json(JSON.parse(message.content ?? '{}'));
//   } catch (e) {
//     console.error('API error:', e);
//     return NextResponse.json(
//       { error: 'Failed to process request' },
//       { status: 500 }
//     );
//   }
// }
