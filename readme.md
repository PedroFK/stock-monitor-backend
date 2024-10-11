# Stock Price Monitor

## Description

This project is the beginning of a backend application designed to monitor the prices of selected stocks. Using the Yahoo Finance API, this backend allows users to retrieve real-time stock price data for various companies, including those listed on the Brazilian stock market.

## Features

- Fetch real-time stock prices using Yahoo Finance.
- Support for Brazilian stocks (e.g., `BBAS3.SA`, `ITUB4.SA`).
- REST API built with Fastify and TypeScript.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stock-price-monitor.git
   cd stock-price-monitor
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
    This will install the following packages:

- **Fastify**: A web framework for Node.js.
- **Yahoo Finance2**: A library to fetch stock market data.
- **tsx**: A fast TypeScript execution engine for Node.js, designed to run TypeScript files directly.

3. Create a .env file in the root directory and add your environment variables:
    ```bash
    touch .env
    ```
4. Start the server:
    ```bash
    npm run start
    ```
The server will run on http://localhost:4000.
    