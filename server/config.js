// Initializes env with default values if not provided.

if (process.env.NODE_ENV === "development") {

    process.env.PORT = process.env.PORT || 3000

    process.env.MONGO_HOST = process.env.MONGO_HOST || "mongodb://localhost:27018/students-admin"

    process.env.MONGO_USR = process.env.MONGO_USR || "sa"

    process.env.MONGO_PASS = process.env.MONGO_PASS || ""

}
