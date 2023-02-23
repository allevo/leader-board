import Link from "next/link"
import React from "react"
import { LeaderBoardItem } from "../types"
import LeaderBoardItemComponent from "./LeaderBoardItem"

export default function LeaderBoardItemListComponent({ items, selected, onFishermanClick }: LeaderBoardItemListComponentProps) {
  return (
    <ol>
      {
        items.map((item, index) => {
          const isSelected = selected === undefined || selected === index
          return (
            <li key={item.fisherman._id} className="w-full px-2 border-b-2 border-neutral-100 border-opacity-100 py-1 dark:border-opacity-50">
              <Link onClick={(ev) => {
                ev.preventDefault()
                onFishermanClick(index)
              }} href={''}>
                <LeaderBoardItemComponent index={index + 1} item={item} toHide={!isSelected} />
              </Link>
            </li>
          )
        })
      }
    </ol>
  )
}


interface OnFishermanClick {
  (id: number): void;
}

export interface LeaderBoardItemListComponentProps {
  items: LeaderBoardItem[],
  onFishermanClick: OnFishermanClick;
  selected: number | undefined;
}
  
