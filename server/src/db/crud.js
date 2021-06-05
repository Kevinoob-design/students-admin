import { MongoConnection } from "./connection.js"

class Crud extends MongoConnection {

    constructor (table, where = {}) {

        super()

        if (!table || typeof table !== "string") throw new Error("Must provide with Table")

        if (where && typeof where !== "object") throw new Error("Where must be an object")

        this.table = table
        this.where = where
    }

    async initializeConnection() {

        try {

            await this._connect()

            this.dbCollection = this.db.collection(this.table)

            return

        } catch (error) {

            throw (error)
        }
    }

    async find(filter = {}, page = 1, limit = 15) {

        try {

            await this.initializeConnection()

            if (filter && typeof filter !== "object") throw new Error("Where must be an object")

            if (filter._id) filter._id = this.ObjectId(filter._id)

            page = (page > 0) ? Number(page) : 1

            limit = (limit > 0 || limit < 15) ? Number(limit) : 10

            const [ { data, count } ] = await this.dbCollection.aggregate([

                {
                    $facet: {

                        data: [

                            { $match: { ...filter, ...this.where } },

                            { $skip: (page - 1) * limit },

                            { $limit: limit }
                        ],

                        count: [

                            { $match: { ...filter, ...this.where } },

                            { $count: "count" }
                        ]
                    },
                },

                { $project: { data: 1, count: "$count.count" } }

            ], { allowDiskUse: true }).toArray()

            this.mongoClient.close()

            return { data, count: count[ 0 ], currentPage: page }

        } catch (error) {

            throw (error)
        }
    }

    async findOne(filter = {}) {

        try {

            await this.initializeConnection()

            if (filter && typeof filter !== "object") throw new Error("Where must be an object")

            if (filter._id) filter._id = this.ObjectId(filter._id)

            const document = await this.dbCollection.findOne({ ...filter, ...this.where })

            this.mongoClient.close()

            if (!document) throw new Error("No student found")

            return document

        } catch (error) {

            throw (error)
        }
    }

    async insertOne(doc) {

        try {

            await this.initializeConnection()

            if (!doc && typeof doc !== "object") throw new Error("Doc must be an object")

            doc.createdDate = new Date()

            const { ops } = await this.dbCollection.insertOne(doc)

            this.mongoClient.close()

            return ops[ 0 ]

        } catch (error) {

            throw (error)
        }
    }

    async findOneAndUpdate(updateFields, filter) {

        try {

            await this.initializeConnection()

            if (!updateFields && typeof updateFields !== "object") throw new Error("Fields must be an object")

            if (updateFields._id) throw new Error("ID cannot be changed")

            if (!filter && typeof filter !== "object") throw new Error("Where must be an object")

            const document = await this.dbCollection.findOneAndUpdate(

                { ...filter, ...this.where },

                { $set: updateFields },

                { returnDocument: "after" }
            )

            this.mongoClient.close()

            return document

        } catch (error) {

            throw (error)
        }
    }
}

export { Crud }
