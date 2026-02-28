import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    this.genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY,
    );

    this.modelName =
      process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  }

  async getResponse(
    userMessage: string,
    userName: string,
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: `
You are Nirvana, an empathetic, calming mental wellness assistant for a university student named ${userName}. 
Keep your answers relatively short (1-2 paragraphs max). 
Focus entirely on helping them manage academic stress, procrastination, burnout, and mental well-being. 
Do not use complex formatting.
If they express severe distress or suicidal thoughts, gently encourage them to seek professional help.
`,
      });

      const result = await model.generateContent(userMessage);
      const response = await result.response;

      return response.text();
    } catch (error) {
      console.error('Gemini Error:', error);
      throw new InternalServerErrorException(
        'Failed to generate AI response',
      );
    }
  }
}