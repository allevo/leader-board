import React, { useState } from "react"

import { LeaderBoard, LeaderBoardItem } from "../types"
import LeftPanelComponent from "./LeftPanel"

import LeaderBoardDetailedItemComponent from "./LeaderBoardDetailedItem"
import LeaderBoardItemListComponent from "./LeaderBoardItemList"

export default function LeaderBoardComponent({ leaderBoard }: LeaderBoardComponentProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | undefined>(undefined)

  function onFishermanClick (itemIndex: number) {
    setSelectedItemIndex(itemIndex)
  }
  function closeLeftPanel() {
    setSelectedItemIndex(undefined)
  }

  const isSelected = selectedItemIndex !== undefined

  const sidePanel = isSelected ? (
    <LeftPanelComponent closeLeftPanel={closeLeftPanel}>
      <LeaderBoardDetailedItemComponent item={leaderBoard.items[selectedItemIndex]} index={selectedItemIndex} />
    </LeftPanelComponent>
  ) : null;

  const width = isSelected ? 'w-2/5' : 'w-full'

  return (
    <div className="flex flex-row h-full">
      <div className={"flex flex-col h-full " + width}>
        <LeaderBoardItemListComponent items={leaderBoard.items} onFishermanClick={onFishermanClick} selected={selectedItemIndex} />
      </div>
      { sidePanel }
      
    </div>
  )
}


export interface LeaderBoardComponentProps {
  leaderBoard: LeaderBoard;
}
