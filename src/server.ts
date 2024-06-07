import app from './app'
import { logger } from './utils'

const port = process.env.PORT || 8000

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`)
})
