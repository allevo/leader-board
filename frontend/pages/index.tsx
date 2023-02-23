import React from 'react'
import Link from 'next/link'

export default function Index () {
  return (
    <h1 className='title'>
      <Link href='/leader-boards/monthly'>Go to Leader Board</Link>
    </h1>
  )
}
