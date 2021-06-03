import express from "express"

const app = express()

const port = process.env.PORT

app.use(express.static("dist/client"))

app.listen(port, () => console.log(`Server running on port: ${port}`))

export { app }
