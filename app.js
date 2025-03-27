import express from 'express'
import router from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

export const app = express()

app.use(express.json())

app.use(router)

import './db/dbConfig.js'

app.listen(process.env.port,()=>{
    console.log(`Serwer slucha na porcie ${process.env.port}`)
})



