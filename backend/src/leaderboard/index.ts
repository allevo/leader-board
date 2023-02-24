import { FastifyPluginAsync } from 'fastify'
import fMongodb from '@fastify/mongodb'
import { Static, Type } from '@sinclair/typebox'

import LeaderBoardService from './Service'
import OgyreRepo from './OgyreRepo'

const LeaderBoardPlugin: FastifyPluginAsync<LeaderBoardPluginOptsType> = async (fastify, opts): Promise<void> => {
  // TODO: add conf
  await fastify.register(fMongodb, {
    url: opts.MONGO_DB_URL
  })

  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const db = fastify.mongo.db!
  const api = new OgyreRepo(
    opts.OGYRE_BASE_URL,
    opts.OGYRE_SECRET
  )
  const service = new LeaderBoardService(db, api)

  // TODO: think a protection for this API
  fastify.post('/admin/import-data', async function (request) {
    await service.importData(request.log)

    return { ok: true }
  })

  fastify.get<{ Params: { year: number, month: number } }>('/leader-board/:year/:month', {
    schema: {
      params: { year: { type: 'integer' }, month: { type: 'integer' } }
    }
  }, async function (request) {
    const { year, month } = request.params

    const leaderBoard = await service.getMonthLeaderBoard(request.log, year, month)

    if (leaderBoard == null) {
      throw fastify.httpErrors.notFound('Leader board not found')
    }

    return leaderBoard
  })
}

export default LeaderBoardPlugin

export const LeaderBoardPluginOpts = Type.Object({
  MONGO_DB_URL: Type.String(),
  OGYRE_BASE_URL: Type.String(),
  OGYRE_SECRET: Type.String()
})
export type LeaderBoardPluginOptsType = Static<typeof LeaderBoardPluginOpts>
