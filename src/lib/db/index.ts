import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'

import * as schema from '@/lib/db/schema'

import { env } from '../utils/env.ts'

export const sql = neon(env.DATABASE_URL)

export const db = drizzleNeon(sql, { schema, logger: false })
