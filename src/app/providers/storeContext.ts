import { createContext, useContext } from 'react'
import { userStore, type UserStore } from '../../entities/user/model/userStore'

export const StoreContext = createContext<UserStore>(userStore)

export const useStore = () => useContext(StoreContext)
