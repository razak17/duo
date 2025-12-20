import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.url().min(1),
    APP_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.url().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE_',

  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_APP_ENV: z.enum(['development', 'test', 'production']),
    VITE_SERVER_URL: z.url(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string().min(1),
    VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    SERVER_URL: process.env.SERVER_URL,
    APP_ENV: process.env.APP_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
    VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL: import.meta.env
      .VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL: import.meta.env
      .VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
