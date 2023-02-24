import Link from 'next/link'
import React, { useState } from 'react'
import { LeaderBoardItem } from '../types'
import LeaderBoardItemComponent from './LeaderBoardItem'

const PER_PAGE = 5

export default function LeaderBoardItemListComponent ({ items, selected, onFishermanClick }: LeaderBoardItemListComponentProps) {
  const [itemNumberToShow, setItemNumberToShow] = useState(PER_PAGE)

  function loadMore () {
    setItemNumberToShow(itemNumberToShow + PER_PAGE)
  }

  const nextPageDiv = itemNumberToShow <= items.length
    ? (
      <div className='text-center'>
        <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={loadMore}>Load more</button>
      </div>
      )
    : null

  return (
    <div>
      <ol>
        {
          items.slice(0, itemNumberToShow).map((item, i) => {
            const isSelected = selected === undefined || selected === i
            const index = i + 1
            return (
              <li key={item.fisherman._id} className='w-full px-2 border-b-2 border-neutral-100 border-opacity-100 py-1 dark:border-opacity-50'>
                <Link
                  onClick={(ev) => {
                    ev.preventDefault()
                    onFishermanClick(i)
                  }} href=''
                >
                  <LeaderBoardItemComponent index={index} item={item} toHide={!isSelected} />
                </Link>
              </li>
            )
          })
        }
      </ol>
      {nextPageDiv}
    </div>
  )
}

type OnFishermanClick = (id: number) => void

export interface LeaderBoardItemListComponentProps {
  items: LeaderBoardItem[]
  onFishermanClick: OnFishermanClick
  selected: number | undefined
}
