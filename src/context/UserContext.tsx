import React, {ReactNode, useState} from 'react'

export interface IUserContext {
    name: string
    setName: (name: string) => void
    pass: string
    setPass: (pass: string) => void
    validated: boolean
    setValidated: (validated: boolean) => void
}

export const UserContext = React.createContext({} as IUserContext)
export const useUserContext = () => React.useContext(UserContext)

interface UserContextProviderProps {
    children: ReactNode | ReactNode[]
}

export const UserContextProvider = (props: UserContextProviderProps) => {
    const {children} = props
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [validated, setValidated] = useState(false)

    const render = () => {
        return (
        <UserContext.Provider
          value={{
              name,
              setName,
              pass,
              setPass,
              validated,
              setValidated
          }}
          >
              {children}
          </UserContext.Provider>
        )
    }

    return render()
}