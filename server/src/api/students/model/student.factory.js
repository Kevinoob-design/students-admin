import { Student } from "./student.model.js"

const buildStudent = (student) => {

    try {

        if (!student || typeof student !== "object")
            throw new Error("Need to provide a valid Student object")

        if (!student.name || typeof student.name !== "string")
            throw new Error("Missing name of the student")

        if (!student.lastName || typeof student.lastName !== "string")
            throw new Error("Missing last name of the student")

        if (!student.age || typeof Number(student.age) !== "number")
            throw new Error("Missing the date of birth of the student")

        if (student.bio && typeof student.bio !== "string")
            throw new Error("Missing the biography of the student")

        return new Student(student.name, student.lastName, Number(student.age), student.bio || "")

    } catch (error) {

        throw (error)
    }
}

export { buildStudent }
