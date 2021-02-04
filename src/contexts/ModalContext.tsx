import React, { createContext, useContext, useState } from 'react'

interface ModalContextData {
  isOpen: boolean
  handleModal(): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setModal] = useState(false)

  function handleModal(): void {
    setModal(!isOpen)
    console.log(isOpen)
  }

  return <ModalContext.Provider value={{ isOpen, handleModal }}>{children}</ModalContext.Provider>
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within an ModalProvider')

  return context
}
