import { Router } from "express"

class BaseRoute {

    constructor () {

        this.router = Router()
    }

    okResponse(res, data) {

        if (!res || !data) throw new Error('response & data required.')

        res.setHeader('Access-Control-Allow-Origin', process.env.ORIGINS)

        res.status(200).json({ success: true, data });
    }

    notOkResponse(res, error = "Something went wrong") {

        const errorToShow = (error && typeof error.message === 'string') ?
            error.message : "Something went wrong"

        res.setHeader('Access-Control-Allow-Origin', '*')

        res.status(400).json({ success: false, error: errorToShow });
    }


    createResponse(res, data = {}) {

        res.setHeader('Access-Control-Allow-Origin', '*')

        res.status(201).json({ success: true, data });
    }


    resultsResponse(res, data = {}, page = 0, count = 0) {

        res.setHeader('Access-Control-Allow-Origin', '*')

        res.status(200).json({ success: true, data, page, count });
    }
}

export { BaseRoute }
