import { makeAutoObservable } from 'mobx'
import type { User } from './types'

export class UserStore {
  filteredUsers: User[] = []
  interestFilter = ''
  isLoading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  setInterestFilter(value: string) {
    this.interestFilter = value.toLowerCase()
    this.isLoading = true
  }

  setFilteredUsers(users: User[]) {
    this.filteredUsers = users
    this.isLoading = false
  }
}

export const userStore = new UserStore()
export type { User } from './types'
