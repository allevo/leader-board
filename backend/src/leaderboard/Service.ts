import OgyreRepo from "./OgyreRepo";
import { Db } from 'mongodb'
import { LeaderBoardType } from "../types";
import { FastifyBaseLogger } from "fastify";

const collectionNames = {
    LEADER_BOARDS: 'leader-boards',
    FISHERMEN: 'fishermen',
    RECOLLECTIONS: 'recollections',
}

export default class LeaderBoardService {
    private mongoCollection: Db;
    private api: OgyreRepo;

    constructor(mongoCollection: Db, api: OgyreRepo) {
        this.mongoCollection = mongoCollection
        this.api = api
    }

    async getMonthLeaderBoard(log: FastifyBaseLogger, year: number, month: number): Promise<LeaderBoardType | null> {
        log.info({ year, month }, 'Get month leader board')
        const monthlyLeaderBoard = this.mongoCollection.collection(collectionNames.LEADER_BOARDS)
        const doc = await monthlyLeaderBoard.findOne({
            year,
            month,
        })

        if (doc) {
            doc.items.sort((a: any, b: any) => b.score - a.score)
        }

        return doc as unknown as LeaderBoardType
    }

    async importData(log: FastifyBaseLogger) {
        // TODO: track when an import is made to avoid concurrent import

        const fishermenCollection = this.mongoCollection.collection(collectionNames.FISHERMEN)
        const recollectionsCollection = this.mongoCollection.collection(collectionNames.RECOLLECTIONS)

        log.info('Building fishermen collection');
        const fishermen = await this.api.fetchFishermen(log)
        // TODO: update it using upset logic
        await fishermenCollection.deleteMany({})
        const docsToInsert = fishermen.map((f: any) => {
            const ogyreId = f._id
            return {
                ...f,
                ogyreId,
                _id: undefined
            }
        })
        await fishermenCollection.insertMany(docsToInsert)

        log.info('Building recollections collection');
        await recollectionsCollection.deleteMany({})
        for (const { _id } of fishermen) {
            const fishermanRecollections = await this.api.fetchFishermanRecollection(log, _id)
            if (fishermanRecollections.length === 0) {
                continue
            }

            const docsToInsert = fishermanRecollections.map((r: any) => {
                const ogyreId = r._id
                return {
                    ...r,
                    ogyreId,
                    date: new Date(r.date),
                    _id: undefined
                }
            })

            await recollectionsCollection.insertMany(docsToInsert)
        }

        await this.createLeaderBoard(log)
    }

    async createLeaderBoard(log: FastifyBaseLogger) {
        log.info('Creating LeaderBoard');
        const recollectionsCollection = this.mongoCollection.collection('recollections')

        const pipeline = [
            {
                $group: {
                    _id: { year: { $year: '$date' }, month: { $month: '$date' }, fishermanId: '$fishermanID' },
                    recollections: { $push: { picture: '$pictureRecollection', kg: '$kg', _id: '$ogyreId' } },
                    total: { $sum: '$kg' }
                }
            },
            {
                $lookup: {
                    from: 'fishermen',
                    localField: '_id.fishermanId',
                    foreignField: 'ogyreId',
                    as: 'fisherman'
                },
            },
            { $unwind: '$fisherman' },
            {
                $project: {
                    recollections: 1,
                    'fisherman.name': '$fisherman.name',
                    'fisherman.picture': '$fisherman.fishermanPicture',
                    'fisherman._id': '$fisherman.ogyreId',
                    score: '$total',
                    year: '$_id.year',
                    month: '$_id.month',
                    _id: 0
                }
            },
            {
                $group: {
                    _id: { year: '$year', month: '$month' },
                    items: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    year: '$_id.year',
                    month: '$_id.month',
                    items: 1,
                    _id: 0
                }
            }
        ]

        // TODO: use $out as the last stage of the pipeline to be atomic
        const leaderBoards = await recollectionsCollection.aggregate(pipeline).toArray()
        const monthlyLeaderBoard = this.mongoCollection.collection(collectionNames.LEADER_BOARDS)
        await monthlyLeaderBoard.deleteMany({})
        await monthlyLeaderBoard.insertMany(leaderBoards)
    }

}

