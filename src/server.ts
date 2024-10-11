import { fastify } from "fastify";

export const app = fastify();

app.listen({ port: 3200, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err)
    }

    console.log('server is running')
})