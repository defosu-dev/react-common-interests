import type { User } from '../../entities/user/model/types'

let users: User[] = []

self.addEventListener('message', event => {
  const { type, payload } = event.data

  if (type === 'SET_USERS') {
    users = payload as User[]
    self.postMessage({ type: 'READY' })
  }

  if (type === 'FILTER') {
    const filter = (payload || '').trim().toLowerCase() as string
    let filtered: User[]
    if (!filter) {
      filtered = users
    } else {
      filtered = users.filter(u =>
        u.interests.some(i => i.toLowerCase().includes(filter))
      )
    }
    self.postMessage({ type: 'RESULT', payload: filtered })
  }
})
