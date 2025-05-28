import makeRequest, { makeParams, RequestMethod } from "../api/make.request";
import urls from "../api/url"

export class DashboardService {
    static async getExamDetails() {
        return await makeRequest(urls.dashboard.getExamDetails, RequestMethod.GET)
    }

    static async getAllUnmappedUsers(pageNumber: number, pageSize: number, search: string) {
        const params = makeParams([
            {
                index: "pageNumber",
                value: pageNumber
            },
            {
                index: "pageSize",
                value: pageSize
            },
            {
                index: "search",
                value: search
            }
        ])
        return await makeRequest(urls.dashboard.getAllUnmappedUsers + params, RequestMethod.GET)

    }

     static async getAllMappedUsers(pageNumber: number, pageSize: number) {
        const params = makeParams([
            {
                index: "pageNumber",
                value: pageNumber
            },
            {
                index: "pageSize",
                value: pageSize
            },
        ])
        return await makeRequest(urls.dashboard.getAllMappedUsers + params, RequestMethod.GET)

    }

}