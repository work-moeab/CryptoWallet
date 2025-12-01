import React, { createContext, useContext, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import APIService from '@src/services/api/APIService'
import { NavigationProps } from '@src/@types/navigation'
import { AppDispatch } from '@src/redux/store'

const APIServiceContext = createContext<ReturnType<typeof APIService.getInstance> | null>(null)

export const APIServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation<NavigationProps>()
  const dispatch = useDispatch<AppDispatch>()

  const apiService = useMemo(
    () => APIService.getInstance(navigation, dispatch),
    [navigation, dispatch],
  )

  return <APIServiceContext.Provider value={apiService}>{children}</APIServiceContext.Provider>
}

export const useAPIService = () => {
  const context = useContext(APIServiceContext)
  if (!context) {
    throw new Error('useAPIService must be used within an APIServiceProvider')
  }
  return context
}
