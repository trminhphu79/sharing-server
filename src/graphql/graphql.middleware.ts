
import { graphqlHTTP } from 'express-graphql'
import { root, schema } from './graphql.schema'

export const graphqlMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
}
