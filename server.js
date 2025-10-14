import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import medicationsRoutes from './routes/medication.route.js'
import historyRoutes from './routes/history.route.js'
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use("/api/medications",medicationsRoutes)
app.use("/api/history/",historyRoutes)
const port = process.env.PORT  || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
