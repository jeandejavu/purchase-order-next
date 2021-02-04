import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cacheDb: Db

async function connectToDatabase(uri: string) {
  if (cacheDb) return cacheDb

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const dbName = url.parse(uri).pathname?.substr(1)
  cacheDb = client.db(dbName)
  return cacheDb
}

export default async (request: NowRequest, response: NowResponse) => {
  if (request.method === 'POST') {
    const { produto } = request.body

    const db = await connectToDatabase(process.env.MONGODB_URI as string)
    const collection = db.collection('produtos')

    const produtoInsert = await collection.insertOne({ ...produto })

    return response.json(produtoInsert.ops[0])
  }

  if (request.method === 'GET') {
    const db = await connectToDatabase(process.env.MONGODB_URI as string)
    const collection = db.collection('produtos')
    const produtos = await collection.find({}).toArray()
    return response.json(produtos)
  }
}
