import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

const fetchStockPrice = async (ticker: string): Promise<number | null> => {
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`);
    const result = response.data.chart.result[0];
    return result.meta.regularMarketPrice;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};

app.get('/stock/:ticker', async (request, reply) => {
  const { ticker } = request.params as { ticker: string };
  const price = await fetchStockPrice(ticker);
  
  if (price !== null) {
    reply.send({ ticker, price });
  } else {
    reply.status(500).send({ error: 'Failed to fetch stock price' });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
