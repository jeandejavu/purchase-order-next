import { NowRequest, NowResponse, VercelResponse } from '@vercel/node'
import { MongoClient, Db, ObjectID } from 'mongodb'
import url from 'url'

let cacheDb: Db

async function connectToDatabase(uri: string): Promise<Db> {
  if (cacheDb) return cacheDb

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const dbName = url.parse(uri).pathname?.substr(1)
  cacheDb = client.db(dbName)
  return cacheDb
}

export default async (request: NowRequest, response: NowResponse): Promise<VercelResponse> => {
  if (request.method === 'DELETE') {
    const {
      query: { id },
    } = request
    const db = await connectToDatabase(process.env.MONGODB_URI as string)
    const collection = db.collection('produtos')
    await collection.deleteOne({ _id: new ObjectID(id as string) })
    return response.status(204).json({})
  }

  return response.status(500).send({ message: 'Internal Server Error' })
}
