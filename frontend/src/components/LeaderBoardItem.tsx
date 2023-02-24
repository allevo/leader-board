import React from 'react'
import { LeaderBoardItem } from '../types'

interface LeaderBoardItemComponentProps {
  index: number
  item: LeaderBoardItem
  toHide: boolean
}

export default function LeaderBoardItemComponent ({ index, item, toHide }: LeaderBoardItemComponentProps) {
  const { fisherman, score } = item
  return (
    <div className={'flex flex-col rounded-lg bg-white shadow-lg md:flex-row ' + (toHide ? 'grayscale dark:bg-neutral-300' : 'dark:bg-neutral-700')}>
      <img
        className='h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
        src={fisherman.picture}
        alt={fisherman.name}
      />
      <div className='flex flex-col justify-start p-6'>
        <h5
          className='mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50'
        >
          {index}. <small>{fisherman.name}</small>
        </h5>
        <p className='text-xs text-neutral-800 dark:text-neutral-50'>
          {score} Kg
        </p>
      </div>
    </div>
  )
}
