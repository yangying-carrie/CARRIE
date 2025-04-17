import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { text, fromLang, toLang } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey || !apiKey.startsWith('sk-')) {
    return NextResponse.json({ translation: '服务器未正确配置 OpenAI API 密钥。' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey });
  const prompt = `请将以下内容从 ${fromLang} 翻译为 ${toLang}：\n\n${text}`;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const translation = chat.choices[0]?.message.content;
    return NextResponse.json({ translation });
  } catch (error) {
    return NextResponse.json({ translation: 'OpenAI 翻译接口出错。' }, { status: 500 });
  }
}
