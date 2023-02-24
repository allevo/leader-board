import React from 'react'
import { LeaderBoardItem } from '../types'

export default function LeaderBoardDetailedItemComponent ({ index, item }: LeaderBoardDetailedItemComponentProps) {
  if (item.recollections.length === 0) {
    return <div>Empty...</div>
  }

  return (
    <div className='m-auto'>
      <div>
        <h2 className='text-xl font-medium text-neutral-800 dark:text-neutral-50'>
          <big>{index + 1}</big>
          <span>&nbsp;- {item.fisherman.name}</span>
          <small>&nbsp;- {item.score}&nbsp;Kg</small>
        </h2>
      </div>
      <div className='flex flex-wrap'>
        {
          item.recollections.map(recollection => {
            return (
              <div key={recollection._id} className='m-4'>
                <img
                  className='max-h-[200px] max-w-[120px] hover:scale-150'
                  src={recollection.picture}
                  alt={`Weight of ${recollection.kg}`}
                />
                <small className='text-neutral-800 dark:text-neutral-50'>{recollection.kg}kg at {new Intl.DateTimeFormat('en-US').format(new Date(recollection.date))}</small>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

interface LeaderBoardDetailedItemComponentProps {
  index: number
  item: LeaderBoardItem
}
