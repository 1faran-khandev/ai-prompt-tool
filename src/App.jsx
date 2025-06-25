import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    setLoading(true);
    setResponse('');

    try {
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;
      const res = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'command-r-plus',
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.8
        })
      });

      const data = await res.json();
      setResponse(data.generations?.[0]?.text || 'No response');
    } catch (err) {
      console.error('Error details:', err);
      setResponse('Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
  <div
  style={{
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  }}
>
    <h1 style={{ color: '#fff', textAlign: 'center' }}> AI Prompt Tool</h1>

    <textarea
      rows="5"
      cols="50"
      placeholder="Type your prompt here..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      style={{
        width: '95%',
        marginBottom: '1rem',
        padding: '1rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        backgroundColor: '#fefefe',
        color: '#333'
      }}
    />

    <br />

    <button
      onClick={sendPrompt}
      disabled={loading}
      style={{
        backgroundColor: '#ff6b81',
        color: '#fff',
        padding: '0.75rem 2rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
      }}
    >
      {loading ? 'Sending...' : 'Send Prompt'}
    </button>

    <div
      style={{
        marginTop: '2rem',
        whiteSpace: 'pre-wrap',
        backgroundColor: '#ffffffdd',
        color: '#111',
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px'
      }}
    >
      <strong>Response:</strong>
      <p>{response}</p>
    </div>
  </div>
)};

export default App;