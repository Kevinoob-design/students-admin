import { MongoConnection } from "./Connection"

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

            this.dbCollection = this.MongoClient.collection(this.table)

            return

        } catch (error) {

            throw (error)
        }
    }

    async find(where = {}, page = 1, limit = 15) {

        try {

            if (where && typeof where !== "object") throw new Error("Where must be an object")

            page = (page > 0) ? page : 1

            limit = (limit > 0 && limit < 15) ? limit : 10

            const [ documents ] = await this.dbCollection.aggregate([

                {
                    $facet: {

                        data: [

                            { $match: { where, ...this.where } },

                            { $limit: limit },

                            { $skip: (page - 1) * limit }
                        ],

                        count: [

                            { $match: { where, ...this.where } },

                            { $count: "count" }
                        ]
                    }
                }

            ], { allowDiskUse: true }).toArray()

            return { ...documents }

        } catch (error) {

            throw (error)
        }
    }

    async findOne(where = {}) {

        try {

            if (where && typeof where !== "object") throw new Error("Where must be an object")

            return await this.dbCollection.findOne({ where, ...this.where })

        } catch (error) {

            throw (error)
        }
    }

    async insertOne(doc) {

        try {

            if (!doc && typeof doc !== "object") throw new Error("Doc must be an object")

            doc.createdDate = new Date()

            return await this.dbCollection.insertOne(doc)

        } catch (error) {

            throw (error)
        }
    }

    async findOneAndUpdate(updateFields, where) {

        try {

            if (!updateFields && typeof updateFields !== "object") throw new Error("Fields must be an object")

            if (updateFields._id) throw new Error("ID cannot be changed")

            if (!where && typeof where !== "object") throw new Error("Where must be an object")

            return await this.dbCollection.findOneAndUpdate(

                { ...where, ...this.where },

                { $set: updateFields },

                { returnDocument: "after" }
            )

        } catch (error) {

            throw (error)
        }
    }
}

module.exports = { Crud }
