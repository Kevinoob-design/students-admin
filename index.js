import express from "express"

process.env.PORT = process.env.PORT || 3000

const app = express()

app.use(express.static("public/dist/client"))

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))
