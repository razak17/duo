import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from 'src/lib/db/schema'

config({ path: ['.env'] })

// biome-ignore lint/style/noNonNullAssertion: ignore
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

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
