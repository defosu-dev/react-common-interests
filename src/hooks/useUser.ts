import { userStore } from '../entities/user/model/userStore'
import type { User } from '../entities/user/model/types'
import { useEffect, useState, useRef } from 'react'
import mockUsersData from '../data/users.json'
import userWorkerInstance from '../shared/lib/userWorkerInstance'
import { reaction } from 'mobx'

export const useUsers = () => {
  const userWorker = userWorkerInstance
  const store = userStore

  const [workerReady, setWorkerReady] = useState(false)
  const initialDataSentToWorker = useRef(false)

  useEffect(() => {
    const handleWorkerMessage = (event: MessageEvent) => {
      if (event.data.type === 'READY') {
        setWorkerReady(true)
        userWorker.postMessage({ type: 'FILTER', payload: store.interestFilter })
      }
      if (event.data.type === 'RESULT') {
        store.setFilteredUsers(event.data.payload)
      }
    }

    userWorker.addEventListener('message', handleWorkerMessage)

    if (!initialDataSentToWorker.current) {
      store.isLoading = true
      userWorker.postMessage({ type: 'SET_USERS', payload: mockUsersData as User[] })
      initialDataSentToWorker.current = true
    }

    return () => {
      userWorker.removeEventListener('message', handleWorkerMessage)
    }
  }, [userWorker, store])

  useEffect(() => {
    const disposeReaction = reaction(
      () => store.interestFilter,
      filterValue => {
        if (workerReady && initialDataSentToWorker.current) {
          userWorker.postMessage({ type: 'FILTER', payload: filterValue })
        }
      },
      { fireImmediately: false }
    )

    return () => {
      disposeReaction()
    }
  }, [workerReady, userWorker, store])

  return {
    isLoading: store.isLoading || !workerReady,
    error: null,
    users: store.filteredUsers,
  }
}
