import fastify from 'fastify';
import yahooFinance from 'yahoo-finance2';

const app = fastify();

interface PriceParams {
    ticker: string;
}

const getTickerPrice = async (ticker: string) => {
    try {
        const result = await yahooFinance.quote(ticker);
        return {
            symbol: result.symbol,
            price: result.regularMarketPrice,
            timestamp: result.regularMarketTime,
        };
    } catch (error) {
        console.error('Erro ao buscar preço do ticker:', error);
        throw new Error('Erro ao buscar preço do ticker');
    }
};

app.get<{ Params: PriceParams }>('/price/:ticker', async (request, reply) => {
    const { ticker } = request.params;

    try {
        const priceData = await getTickerPrice(ticker);
        reply.send(priceData);
    } catch (error) {
        if (error instanceof Error) {
            reply.status(500).send({ error: error.message });
        } else {
            reply.status(500).send({ error: 'Erro desconhecido' });
        }
    }
});

const start = async () => {
    try {
        await app.listen({ port: 4000, host: '0.0.0.0' });
        console.log('Servidor Yahoo Finance rodando em http://localhost:4000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
