import express, { Application } from 'express'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import { configure } from './routes'
var cors = require('cors')

dotenv.config()

const app: Application = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
configure(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Server running'))
