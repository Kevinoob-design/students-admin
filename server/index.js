import "./config.js"
import { StudentsRoute } from "./src/api/students/student.routes.js"

import express from "express"

const app = express()

const port = Number(process.env.PORT)

app.use(express.static("dist/client"))
app.use("/api/v1/students", new StudentsRoute().router)

app.listen(port, () => console.log(`Server running on port: ${port}`))

