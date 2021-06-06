import { BaseRoute } from "../base.routes.js"
import { StudentsController } from "./student.controller.js"
import bodyParser from "body-parser"

class StudentsRoute extends BaseRoute {

    constructor () {

        super()

        const studentsController = new StudentsController()

        this.router.get("/", async (req, res) => {

            try {

                const { page, limit } = req.query

                const { data, currentPage, count } = await studentsController.getStudents({ page, limit })

                this.resultsResponse(res, data, currentPage, count)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })

        this.router.get("/:_id", async (req, res) => {

            try {

                const { _id } = req.params

                const data = await studentsController.getStudent(_id)

                this.okResponse(res, data)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })

        this.router.post("/", bodyParser.json(), async (req, res) => {

            try {

                const obj = req.body

                const data = await studentsController.insertStudent(obj)

                this.createResponse(res, data)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })

        this.router.post("/insertStudents", bodyParser.json(), async (req, res) => {

            try {

                const obj = req.body

                const data = await studentsController.insertStudents(obj)

                this.createResponse(res, data)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })

        this.router.put("/:_id", bodyParser.json(), async (req, res) => {

            try {

                const { _id } = req.params

                const obj = req.body

                const data = await studentsController.updateStudent(_id, obj)

                this.okResponse(res, data)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })

        this.router.delete("/:_id", async (req, res) => {

            try {

                const { _id } = req.params

                const data = await studentsController.deleteStudent(_id)

                this.okResponse(res, data)

            } catch (error) {

                this.notOkResponse(res, error)
            }
        })
    }
}

export { StudentsRoute }
