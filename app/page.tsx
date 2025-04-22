'use client';
import { useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('中文');
  const [toLang, setToLang] = useState('英文');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://o9yixkuw4d.execute-api.us-east-1.amazonaws.com/prod/translate', {
        text,
        fromLang,
        toLang,
      });
      setResult(res.data.translation);
    } catch (error) {
      setResult('翻译出错，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>AI 多语言翻译平台</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="请输入原文..."
        rows={6}
        style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
      />
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
          <option>中文</option>
          <option>英文</option>
          <option>日文</option>
          <option>韩文</option>
        </select>
        <span>→</span>
        <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
          <option>英文</option>
          <option>中文</option>
          <option>日文</option
