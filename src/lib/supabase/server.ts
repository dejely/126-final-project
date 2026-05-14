import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiProxy } from './proxy'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'Aniguess API server is running' })
})

app.use('/api', apiProxy)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})