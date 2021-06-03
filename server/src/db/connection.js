import { MongoClient } from "mongodb"

class MongoConnection {

    async _connect() {

        try {

            const clientMongo = new MongoClient(process.env.MONGO_HOST, {

                useNewUrlParser: true, useUnifiedTopology: true,

                auth: {

                    user: process.env.MONGO_USR,
                    password: process.env.MONGO_PASS

                },
            })

            await clientMongo.connect()

            this.MongoClient = clientMongo.db(dataSource.DB_NAME)

        } catch (error) {

            throw (error)
        }
    }
}

export { MongoConnection }
