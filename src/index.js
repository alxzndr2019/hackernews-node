const {GraphQLServer} = require ('graphql-yoga')

//1
// const typeDefs = `
// type Query {
//     info: String!
//     feed:[Link!]!
// }

// type Mutation {
//     post(url: String!, description: String!):Link!
// }

// type Link{
//     id: ID!
//     description: String!
//     url: String!
// }
// `
let links =[{
    id: 'link-0',
    url: 'www.howtographl.com',
    description:'Fullstack tutorial for GraphQL'
}]
//2
let idCount = links.length
const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      //2
      feed: ()=> links,
    },
    //3
    Link:{
        id:(parent)=> parent.id,
        description: (parent)=>parent.description,
        url:(parent)=> parent.url,
    },
    Mutation:{
        post: (parent, args)=>{
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    },
  }

//3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
  })
  server.start(() => console.log(`Server is running on http://localhost:4000`))