import { fastify } from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

export const app = fastify({logger: true});

const start = async () => {

    await app.register(cors);
    await app.register(routes);

    try {
        await app.listen({port: 3200, host: '0.0.0.0'})
    } catch (err) {
        process.exit(1)
    }
}

start();