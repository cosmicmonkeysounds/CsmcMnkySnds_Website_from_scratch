import "reflect-metadata"; // required for GraphQL
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver} from "./resolvers/user";

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const main = async () => {

    const orm = await MikroORM.init(mikroConfig);``
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        session({
            name: 'qid',
            secret: 'asd7hn5giasch52',
            resave: false,
            saveUninitialized: false,

            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years in milliseconds
                httpOnly: true,
                sameSite: 'lax', // csrf - Google me!
                secure: __prod__ // only works in https
            },

            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }) // request, response objects
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started @ localhost:4000')
    });

    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts);
}

main().catch((err) => {
    console.error(err);
});

console.log("done!");