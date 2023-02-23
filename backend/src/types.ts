import { Static, Type } from '@sinclair/typebox'

export const Recollection = Type.Object({
  _id: Type.String(),
  kg: Type.Number(),
  createdAt: Type.Date(),
  pictureRecollection: Type.String()
})
export const RecollectionList = Type.Array(Recollection)

export type RecollectionType = Static<typeof Recollection>
export type RecollectionTypeList = Static<typeof RecollectionList>

export const LeaderBoardFishermanItem = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  picture: Type.String(),
  kg: Type.Number()
})
export const LeaderBoardFishermanItemList = Type.Array(LeaderBoardFishermanItem)

export type LeaderBoardFishermanItemType = Static<typeof LeaderBoardFishermanItem>
export type LeaderBoardFishermanItemTypeList = Static<typeof LeaderBoardFishermanItemList>

export const LeaderBoardItem = Type.Object({
  recollections: Type.Array(Type.Object({
    picture: Type.String(),
    kg: Type.Number()
  })),
  fisherman: Type.Object({
    name: Type.String(),
    _id: Type.String()
  }),
  score: Type.Number()
})
export const LeaderBoard = Type.Object({
  year: Type.Number(),
  month: Type.Number(),
  items: Type.Array(LeaderBoardItem)
})
export type LeaderBoardType = Static<typeof LeaderBoard>
