import { Crud } from "../../db/crud.js"
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

    async insertStudents(studentsArray) {

        try {

            if (!studentsArray && studentsArray.length > 0) throw new Error("No student were provided")

            const students = studentsArray.map(student => buildStudent(student))

            await this.initializeConnection()

            const lot = Math.ceil(students.length / 1000)

            for (let i = 0; i < lot; i++) {

                await this.dbCollection.insertMany(students.splice(0, 1000))
            }

            await this.mongoClient.close()

            return "All the students inserted"

        } catch (error) {

            throw (error)
        }
    }

    async updateStudent(_id, studentObj) {

        try {

            const student = buildStudent(studentObj)

            return await this.findOneAndUpdate(student, { _id })

        } catch (error) {

            throw (error)
        }
    }

    async deleteStudent(_id) {

        try {

            return await this.deleteOne({ _id })

        } catch (error) {

            throw (error)
        }
    }
}

export { StudentsController }
