import { test } from 'tap'
import { build } from '../helper'
import nock from 'nock'
import { join } from 'path'
import { LeaderBoardType } from '../../src/types'

test('after import data', async (t) => {
  const [app, config] = await build(t)

  const scope = nock(config.OGYRE_BASE_URL)
    .matchHeader('Authorization', `Bearer ${config.OGYRE_SECRET}`)
    .get('/fishermen')
    .reply(200, () => require(join(__dirname, 'mock', 'fishermen.json')))
    .get(/recollections/)
    .times(3)
    .reply(200, (uri) => require(join(__dirname, 'mock', `${uri.split('/').pop()}.json`)))

  const res = await app.inject({
    url: '/admin/import-data',
    method: 'POST',
  })
  t.equal(res.statusCode, 200)
  t.same(JSON.parse(res.payload), { ok: true })
  scope.done()

  t.test('should able to fetch the leader board', async t => {
    const res = await app.inject({
      url: '/leader-board/2023/1'
    })

    t.equal(res.statusCode, 200)
    const body = JSON.parse(res.payload) as LeaderBoardType
    t.equal(body.year, 2023)
    t.equal(body.month, 1)

    t.equal(body.items[0].fisherman._id, 'aaaaaaaaaaaaaaaaaaaaaaaa')
    t.equal(body.items[0].score, 63.2)

    t.equal(body.items[1].fisherman._id, 'bbbbbbbbbbbbbbbbbbbbbbbb')
    t.equal(body.items[1].score, 4)

    t.notOk(body.items.find(i => i.fisherman._id === 'cccccccccccccccccccccccc'))

    t.end()
  })

  t.test('should return 404 if the leader board doesn\'t exist', async t => {
    const res = await app.inject({
      url: '/leader-board/4444/666'
    })

    t.equal(res.statusCode, 404)

    t.end()
  })

  t.end()
})
