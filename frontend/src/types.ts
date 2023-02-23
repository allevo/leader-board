
export interface Fisherman {
  _id: string
  name: string
  picture: string
}

export interface Recollection {
  _id: string
  kg: number
  picture: string
  date: string
}

export interface LeaderBoardItem {
  fisherman: Fisherman
  month: number
  recollections: Recollection[]
  score: number
  year: number
}

export interface LeaderBoard {
  _id: string
  items: LeaderBoardItem[]
  month: number
  year: number
}
