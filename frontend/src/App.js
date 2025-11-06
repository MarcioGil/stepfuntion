import React, { useState } from 'react';

function App() {
  const [order, setOrder] = useState({ orderId: '', amount: '', items: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    // Simulação: aqui você integraria com API Gateway/Lambda
    setTimeout(() => {
      setResult({ status: 'VALID', message: 'Pedido processado com sucesso!' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Simulador de Pedido E-commerce</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="orderId" placeholder="ID do Pedido" value={order.orderId} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Valor" value={order.amount} onChange={handleChange} required />
        <input name="items" placeholder="Itens (separados por vírgula)" value={order.items} onChange={handleChange} required />
        <button type="submit" disabled={loading}>Enviar Pedido</button>
      </form>
      {loading && <p>Processando pedido...</p>}
      {result && (
        <div style={{ marginTop: 24, padding: 16, background: '#f0f0f0', borderRadius: 8 }}>
          <strong>Status:</strong> {result.status}<br />
          <span>{result.message}</span>
        </div>
      )}
      <hr style={{ margin: '32px 0' }} />
      <h2>Como funciona?</h2>
      <ol>
        <li>Preencha os dados do pedido.</li>
        <li>Envie para simular o processamento.</li>
        <li>Veja o status e resultado do workflow.</li>
      </ol>
      <p style={{ fontSize: 13, color: '#888' }}>
        * Para integração real, conecte este frontend ao endpoint do API Gateway que inicia a Step Function.
      </p>
    </div>
  );
}

export default App;
