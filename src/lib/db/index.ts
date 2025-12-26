import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'

const localConnection = {
  password: process.env.DB_PASSWORD as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  ssl: false,
}

import * as schema from '@/lib/db/schema'

import { env } from '../utils/env.ts'

export const db =
  env.APP_ENV === 'development'
    ? drizzlePostgres({ schema, connection: localConnection, logger: false })
    : drizzleNeon(neon(env.DATABASE_URL as string), { schema, logger: false })
