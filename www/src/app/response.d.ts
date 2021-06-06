export interface resultsResponse<dataRes> {
    success: boolean,
    data: dataRes,
    page: number,
    count: number
}

export interface okResponse<dataRes> {
    success: boolean,
    data: dataRes
}

export interface createResponse<dataRes> {
    success: boolean,
    data: dataRes
}

export interface notOkResponse {
    success: boolean,
    error: string
}



