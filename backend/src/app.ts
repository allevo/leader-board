import { FastifyPluginAsync } from 'fastify';
import Ajv from 'ajv'
import fSensible from '@fastify/sensible'

import LeaderBoardPlugin, { LeaderBoardPluginOpts, LeaderBoardPluginOptsType } from './leaderboard/index'
import { Type } from '@sinclair/typebox';

const app: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {

  fastify.register(fSensible)

  const config = {
    ...process.env,
    ...opts,
  }

  const schema = Type.Object(LeaderBoardPluginOpts.properties, { additionalProperties: false });
  
  const ajv = new Ajv({ removeAdditional: true })
  /* istanbul ignore next */
  if (!ajv.validate(schema, config)) {
    fastify.log.error(ajv.errors, 'Invalid configuration')
    throw new Error('Invalid configuration')
  }

  void fastify.register(LeaderBoardPlugin, config as LeaderBoardPluginOptsType)

};

export default app;
export { app }
