/* TODO no longer needed
import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import Jwt, {VerifyPayloadType} from "@fastify/jwt";
import fp from "fastify-plugin";
import dotenv from "dotenv";

dotenv.config();
const env = process.env;

declare module 'fastify' {
    interface FastifyRequest {
        // You can easily find the type of this return using intellisense inferral below
        jwtVerify(): Promise<VerifyPayloadType>
    }
    interface FastifyInstance {
        auth(): void,
    }
}


//swap to export at some point so it doesn't break things
const AuthPlugin = fp(async function(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(import("@fastify/jwt"), {
            secret: env.VITE_SECRET,
    });

    fastify.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
            // This is the thing we added in our interface above
            await request.jwtVerify() //change this to auth0's verify
        } catch (err) {
            reply.send(err);
        }
    });
});


export const AuthPlugin = fp(async function(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(import("@fastify/jwt"), {
        secret: "superSecret"
    });

    fastify.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
            // This is the thing we added in our interface above
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});

 */