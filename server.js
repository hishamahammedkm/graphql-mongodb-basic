const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const axios = require('axios')
const app = express()

const msg = 'test data'
const schema = buildSchema(`
   type User {
       name:String
       age:Int
       colloge:String
   }
   type Post {
    userId:Int
    id:Int
    title:String
    body:String
   }
   type Query {
       hello:String
       wish(name:String place:String!):String
       getUser:User
       getUsers:[User]
       getPosts:[Post]
   }
   input UserInput {
    name:String!
    age:Int!
    colloge:String!
   }

   type Mutation {
       setMsg(newMsg:String):String
       setUser(user:UserInput):User
   }
`)



const root = {
    hello: () => {
        return 'Hello Hisham'
    },
    wish: (args) => {
        return `${args.name} ${args.place} goodmorning`
    },
    getUser: () => {
        // dammy data
        const user = {
            name: 'Hisham',
            age: 23,
            colloge: 'Karulai'

        }
        return user
    },
    getUsers: () => {
        const users = [
            {
                name: 'Hisham',
                age: 23,
                colloge: 'Karulai'
            },
            {
                name: 'sanu',
                age: 22,
                colloge: 'varikkal'
            }
        ]
        return users

    },
    getPosts: async() => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return data

    },
    setMsg:({newMsg})=>{
        return newMsg

    },
    setUser:(args)=>{
        return args.user
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))

app.listen(3000, () => console.log('server is running on port 3000'))