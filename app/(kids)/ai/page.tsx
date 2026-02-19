// AI Assistant Page
'use client';

import { useState } from 'react';

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState('generate');
  const [word, setWord] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [explanation, setExplanation] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, translation: '苹果', numQuestions: 3 }),
    });
    const data = await res.json();
    setQuestions(data.questions || []);
    setLoading(false);
  };

  const getExplanation = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, translation: '苹果', example: 'I eat an apple.' }),
    });
    const data = await res.json();
    setExplanation(data.explanation || '');
    setLoading(false);
  };

  const getRecommendations = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/recommend');
    const data = await res.json();
    setRecommendations(data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">🤖 AI学习助手</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <label>输入单词:</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="e.g. apple"
          />
        </div>
      </div>

      <div className="tabs tabs-boxed mb-6">
        <a className={`tab ${activeTab === 'generate' ? 'tab-active' : ''}`} onClick={() => setActiveTab('generate')}>练习题生成</a>
        <a className={`tab ${activeTab === 'explain' ? 'tab-active' : ''}`} onClick={() => setActiveTab('explain')}>知识解释</a>
        <a className={`tab ${activeTab === 'recommend' ? 'tab-active' : ''}`} onClick={() => setActiveTab('recommend')}>智能推荐</a>
      </div>

      {activeTab === 'generate' && (
        <div>
          <button onClick={generateQuestions} disabled={loading} className="btn btn-primary mb-4">
            {loading ? '生成中...' : '生成练习题'}
          </button>
          <div>
            {questions.map(q => (
              <div key={q.id} className="card bg-base-100 shadow-xl mb-4">
                <div className="card-body">
                  <h3>{q.content}</h3>
                  {q.options && <ul>{q.options.map(opt => <li key={opt}>{opt}</li>)}</ul>}
                  <p><strong>答案:</strong> {q.correctAnswer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'explain' && (
        <div>
          <button onClick={getExplanation} disabled={loading} className="btn btn-primary mb-4">
            {loading ? '生成中...' : '获取解释'}
          </button>
          <pre className="bg-gray-100 p-4 rounded">{explanation}</pre>
        </div>
      )}

      {activeTab === 'recommend' && (
        <div>
          <button onClick={getRecommendations} disabled={loading} className="btn btn-primary mb-4">
            {loading ? '分析中...' : '获取推荐'}
          </button>
          {recommendations && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3>薄弱点: {recommendations.weakPoints?.weakCategories?.join(', ')}</h3>
                <pre>{recommendations.suggestions}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
