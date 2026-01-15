import React, { useState, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/providers/storeContext'
import { debounce } from '../../shared/lib/debounce'

export const InterestFilter = observer(() => {
  const store = useStore()
  const [input, setInput] = useState(store.interestFilter)

  useEffect(() => {
    if (input !== store.interestFilter) {
      setInput(store.interestFilter)
    }
  }, [store.interestFilter])

  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      store.setInterestFilter(value)
    }, 1000),
    [store]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    debouncedSetFilter(value)
  }

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter interest (e.g. music)"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 pr-12 text-neutral-200 placeholder-neutral-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
        />
      </div>
      {store.interestFilter && (
        <div className="text-sm text-neutral-400">
          Found {store.filteredUsers.length.toLocaleString()} users for "
          {store.interestFilter}"
        </div>
      )}
      {!store.interestFilter && store.filteredUsers.length > 0 && (
        <div className="text-sm text-neutral-400">
          Total {store.filteredUsers.length.toLocaleString()} users available.
        </div>
      )}
    </div>
  )
})
