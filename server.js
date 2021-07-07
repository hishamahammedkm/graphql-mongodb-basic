const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const mongoose = require('mongoose')
const app = express()

const typeDefs = require('./typeDefs')

const resolvers = require('./resolvers')

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    
    app.use((req,res)=>{
        res.send('express apollo server')
    })

    await mongoose.connect('mongodb+srv://hisham:786@cluster0.gik7k.mongodb.net/graphql?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('database connected');
    
    app.listen(3000,()=>console.log('server is runnig on port 3000'))
}
startServer()



























