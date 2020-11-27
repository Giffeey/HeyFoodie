import { createContext } from 'react'

import { CartStore } from './CartStore'
import { UserStore } from './UserStore'
import { SalesizeStore} from './SalesizeStore'

export const storesContext = createContext({
    cartStore: new CartStore(),
    userStore: new UserStore(),
    salesizeStore: new SalesizeStore()
})