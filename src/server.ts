import { connect } from './db'
import app from './app'

const port = process.env.PORT || 8000
  
connect()

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})
