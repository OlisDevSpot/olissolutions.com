'use client'

import { Button } from '@olis/ui/components/button'
import { SearchIcon } from 'lucide-react'

import { useEffect, useState } from 'react'
import { DashboardCommand } from './dashboard-command'

export function SearchButton() {
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <Button
        className="w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        variant="outline"
        onClick={() => setCommandOpen(open => !open)}
      >
        <SearchIcon />
        Search
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">&#8984;</span>
          <span className="text-sm mb-0.5">K</span>
        </kbd>
      </Button>
    </>
  )
}
