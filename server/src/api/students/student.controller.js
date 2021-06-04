import { Crud } from "../../db/Crud.js"
import { buildStudent } from "./model/student.factory.js"

class StudentsController extends Crud {

    constructor () {

        super("STUDENTS")
    }

    async getStudent(_id) {

        try {

            return await this.findOne({ _id })

        } catch (error) {

            throw (error)
        }
    }

    async getStudents({ filter, page, limit }) {

        try {

            return await this.find(filter, page, limit)

        } catch (error) {

            throw (error)
        }
    }

    async insertStudent(studentObj) {

        try {

            const student = buildStudent(studentObj)

            return await this.insertOne(student)

        } catch (error) {

            throw (error)
        }
    }
}

export { StudentsController }
