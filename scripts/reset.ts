import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from 'src/lib/db/schema'

config({ path: ['.env.local'] })

const localConnection = {
  password: process.env.DB_PASSWORD as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  ssl: false,
}

const db = drizzle({
  schema,
  connection: localConnection,
  logger: true,
})

const main = async () => {
  try {
    console.log('Resetting the database')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    await db.delete(schema.userSubscription)

    console.log('Resetting finished')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to reset the database')
  }
}

main()
