import React from 'react'

export default function LeftPanelComponent ({ closeLeftPanel, children }: LeftPanelComponentProps) {
  return (
    <aside id='default-sidebar' className='overflow-y-auto w-full md:w-3/5 px-3 py-4 dark:bg-neutral-700 flex flex-col h-full overflow-hidden h-full right-0 fixed' aria-label='Sidebar'>
      <button tabIndex={0} className='fixed right-0 top-0 text-zinc-900 m-4' onClick={() => closeLeftPanel()}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      {children}
    </aside>
  )
}

type CloseLeftPanelFn = () => void

export interface LeftPanelComponentProps {
  closeLeftPanel: CloseLeftPanelFn
  children: JSX.Element
}
