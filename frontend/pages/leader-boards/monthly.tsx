import React from 'react';
import LeaderBoardComponent, { LeaderBoardComponentProps } from '../../src/components/LeaderBoard';

export default function PageLeaderBoardFishermen({ leaderBoard }: PageLeaderBoardFishermenProps) {
  return (
      <main>
        <LeaderBoardComponent leaderBoard={leaderBoard} />
      </main>
  )
}

interface PageLeaderBoardFishermenProps extends LeaderBoardComponentProps {}

export async function getServerSideProps(context) {
  const data = await fetch('http://localhost:8080/leader-board/2023/1')
  const leaderBoard = await data.json()

  return {
    props: { leaderBoard },
  }
}

  