import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import createServer from './server'
import CONFIG from './config'
import schema from './schema'
import middleware from './middleware'

const { app } = createServer()
const url = new URL(CONFIG.GRAPHQL_URI)
const ws = new URL(CONFIG.WEBSOCKET_URI)

app.listen({ port: url.port }, () => {
  /* eslint-disable-next-line no-console */
  console.log(`GraphQLServer ready at ${CONFIG.GRAPHQL_URI} 🚀`)
  /* eslint-disable-next-line no-console */
})

app.listen({ port: ws.port }, () => {
  SubscriptionServer.create(
    {
      schema: middleware(schema),
      execute,
      subscribe,
    },
    {
      server: app,
      path: CONFIG.SUBSCRIPTIONS_PATH,
    },
  )
  /* eslint-disable-next-line no-console */
  console.log(
    `WS Subscriptions server is now running on ${CONFIG.WEBSOCKET_URI}${CONFIG.SUBSCRIPTIONS_PATH}`,
  )
})
