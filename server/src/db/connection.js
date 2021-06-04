import MongoClient from "mongodb"

class MongoConnection {

    async _connect() {

        try {

            this.mongoClient = await new MongoClient(process.env.MONGO_HOST, {

                useNewUrlParser: true, useUnifiedTopology: true
            })

            await this.mongoClient.connect()

            this.db = this.mongoClient.db(process.env.DB_NAME)

            this.ObjectId = MongoClient.ObjectId

            return

        } catch (error) {

            throw (error)
        }
    }
}

export { MongoConnection }
