import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

export default defineConfig({
  out: './.drizzle',
  schema: './src/lib/db/schema',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  // biome-ignore lint/style/noNonNullAssertion: ignore
  dbCredentials: { url: process.env.DATABASE_URL! },
})
