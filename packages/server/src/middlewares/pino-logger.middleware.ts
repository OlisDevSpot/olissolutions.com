import { pinoLogger as logger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
  return logger({
    pino: pino({
      level: process.env.LOG_LEVEL || 'info',
    }, pretty()),
  })
}
