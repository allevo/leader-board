import { FastifyInstance } from 'fastify'
import * as path from 'path'
import * as tap from 'tap'
import { LeaderBoardPluginOptsType } from '../src/leaderboard'
const helper = require('fastify-cli/helper.js')

export type Test = typeof tap['Test']['prototype']

const AppPath = path.join(__dirname, '..', 'src', 'app.ts')

async function getConfig (): Promise<LeaderBoardPluginOptsType> {
  const dbName = `ogyre-test-${`${Math.random()}`.split('.')[1]}`
  return {
    MONGO_DB_URL: `mongodb://localhost/${dbName}`,
    OGYRE_BASE_URL: 'http://localhost',
    OGYRE_SECRET: 'the-ogyre-secret'
  }
}

async function build (t: Test): Promise<[FastifyInstance, LeaderBoardPluginOptsType]> {
  const argv = [AppPath, '--log-level=trace']
  const config = await getConfig()
  const app = await helper.build(argv, config)

  t.teardown(() => app.close())

  return [app, config]
}

export {
  build
}
