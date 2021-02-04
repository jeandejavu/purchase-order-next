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
  const { produto } = request.body

  const db = await connectToDatabase(process.env.MONGODB_URI as string)
  const collection = db.collection('produtos')

  switch (request.method) {
    case 'POST':
      // UPDATE
      if (produto._id && produto._id !== '') {
        await collection.findOneAndUpdate(
          { _id: new ObjectID(produto._id) },
          {
            $set: {
              codigo: produto.codigo,
              descricao: produto.descricao,
              preco_minimo: produto.preco_minimo,
              observacao: produto.observacao,
            },
          },
          {
            upsert: true,
          }
        )

        return response.json(produto)
      }

      // CREATE
      // eslint-disable-next-line no-case-declarations
      const result = await collection.insertOne({ ...produto })
      return response.json({ ...result.ops[0], _id: result.insertedId })
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const produtos = await collection.find({}).toArray()
      return response.json(produtos)
  }

  return response.status(500).send({ message: 'Internal Server Error' })
}
