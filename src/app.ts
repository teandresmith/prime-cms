import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { configure } from './routes'

dotenv.config()

const app: Application = express()
configure(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Server running'))
