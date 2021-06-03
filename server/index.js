import "./config.js"
import express from "express"

const app = express()

app.use(express.static("dist/client"))

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))
