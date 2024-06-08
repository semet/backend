import corsPackage from 'cors'

import { whitelist } from '@/configs'

const isDev = process.env.NODE_ENV === 'development'

export const cors = corsPackage({
  origin: (origin, callback) => {
    if (isDev || (origin && whitelist.has(origin))) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
})
