'use client';
import { useState } from 'react';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('中文');
  const [toLang, setToLang] = useState('英文');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/translate', { text, fromLang, toLang });
      setResult(res.data.translation);
    } catch (error) {
      setResult('翻译出错，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">AI 多语言翻译平台</h1>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="请输入原文..." className="mb-4" />
      <div className="flex gap-2 mb-4">
        <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} className="border rounded px-2 py-1">
          <option>中文</option>
          <option>英文</option>
          <option>日文</option>
          <option>韩文</option>
        </select>
        <span>→</span>
        <select value={toLang} onChange={(e) => setToLang(e.target.value)} className="border rounded px-2 py-1">
          <option>英文</option>
          <option>中文</option>
          <option>日文</option>
          <option>韩文</option>
        </select>
      </div>
      <Button onClick={handleTranslate} disabled={loading}>
        {loading ? '翻译中...' : '开始翻译'}
      </Button>
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
