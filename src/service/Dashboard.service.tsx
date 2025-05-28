import makeRequest, { makeParams, RequestMethod } from "../api/make.request";
import makeUploadRequest from "../api/uploadRequest";
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

    static async uploadZipStudentData(payload: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) {
        return await makeUploadRequest(urls.dashboard.uploadZipStudentData, RequestMethod.POST, payload, onUploadProgress);
    }

    static async uploadCSVStudentData(payload: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) {
        return await makeUploadRequest(urls.dashboard.uploadCSVStudentData, RequestMethod.POST, payload, onUploadProgress);
    }

    static async mapSingleStudent(studentId: any) {
        return await makeRequest(urls.dashboard.mapSingleStudent + "/" + studentId, RequestMethod.POST);
    }

    static async mapMultipleStudents(payload: any) {
        return await makeRequest(urls.dashboard.mapMultipleStudents, RequestMethod.POST, payload);
    }

    static async resetMappedStudentPassword(studentId: any, payload:any) {
        return await makeRequest(urls.dashboard.resetMappedStudentPassword + "/" + studentId, RequestMethod.PUT, payload);
    }


}