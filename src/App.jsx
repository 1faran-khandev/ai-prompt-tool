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
          max_tokens: 300,
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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1> AI Prompt Tool </h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={sendPrompt} disabled={loading}>
        {loading ? 'Sending...' : 'Send Prompt'}
      </button>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;