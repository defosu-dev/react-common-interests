import React from 'react'
import { StoreContext } from './storeContext'
import { userStore } from '../../entities/user/model/userStore'

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={userStore}>{children}</StoreContext.Provider>
)
