import fastify, { FastifyRequest } from 'fastify';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify();

const API_KEY = process.env.API_KEY; // Substitua pela sua chave de API
const API_URL = 'https://www.alphavantage.co/query';

// Define a interface para os parâmetros
interface PriceParams {
    ticker: string;
}

// Função para obter o preço do ticker
const getTickerPrice = async (ticker: string) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: ticker,
                interval: '5min',
                apikey: API_KEY
            }
        });

        const timeSeries = response.data['Time Series (5min)'];
        if (!timeSeries) {
            throw new Error('Ticker não encontrado ou dados não disponíveis.');
        }

        // Pega o primeiro registro (mais recente)
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTimestamp];
        return {
            timestamp: latestTimestamp,
            open: latestData['1. open'],
            high: latestData['2. high'],
            low: latestData['3. low'],
            close: latestData['4. close'],
            volume: latestData['5. volume']
        };
    } catch (error) {
        console.error('Erro ao buscar preço do ticker:', error);
        throw new Error('Erro ao buscar preço do ticker');
    }
};

// Rota para obter o preço do ticker BBAS3
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

// Iniciando o servidor
const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Servidor rodando em http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
