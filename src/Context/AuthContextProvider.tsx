import React, { createContext, useEffect, useState, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface ILogData {
  id?: string
  email?: string
  name?: string
  role?: string

}

interface AuthContextType {
  token: string | null
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  LogData: ILogData | null
  setLogData: React.Dispatch<React.SetStateAction<ILogData | null>>
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export default function AuthContextProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null)
  const [LogData, setLogData] = useState<ILogData | null>(null)

  useEffect(() => {
    const TokenStorge = localStorage.getItem('token')
    if (TokenStorge) {
      setToken(TokenStorge)
      try {
        setLogData(jwtDecode<ILogData>(TokenStorge))
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, LogData, setLogData }}>
      {children}
    </AuthContext.Provider>
  )
}
