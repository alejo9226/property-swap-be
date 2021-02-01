import { connect } from './db'
import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const port = 8000 || process.env.PORT
  
connect()

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})
