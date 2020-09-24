import { createContext } from 'react'

import { CartStore } from './CartStore'
import { UserStore } from './UserStore'

export const storesContext = createContext({
    cartStore: new CartStore(),
    userStore: new UserStore(),
})