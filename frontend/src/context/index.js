import { createContext } from 'react'

import { CartStore } from './CartStore'

export const storesContext = createContext({
    cartStore: new CartStore(),
})