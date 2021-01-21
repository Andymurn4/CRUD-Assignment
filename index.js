const { ApolloServer, PubSub } = require ('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req})
});

mongoose
.connect(MONGODB, {useNewUrlParser: true})
.then(()=>{
        consiole.log('MongoDB Connected');
    return server.listen({port: 5000});
})
.then(res=>{
    console.log(`Server runnning at ${res.url}`);
});

server.listen({port: 5000}).then(res=>{
    console.log(`Server runnning at ${res.url}`);
});



