import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

const env = process.env.APP_ENV || 'development'

const localConnection = {
  password: process.env.DB_PASSWORD as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  ssl: false,
}

export default defineConfig({
  out: './.drizzle',
  schema: './src/lib/db/schema',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials:
    env === 'development'
      ? localConnection
      : { url: process.env.DATABASE_URL as string },
})
