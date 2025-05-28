import makeRequest, { RequestMethod } from "../api/make.request";
import urls from "../api/url";

export class InvigilatorService {
    static async getAllInvigilators() {
        return await makeRequest(urls.invigilator.getAllInvigilators, RequestMethod.GET);
    }

    static async getInvigilatorById(id: string) {
        return await makeRequest(`${urls.invigilator.getInvigilatorById}/${id}`, RequestMethod.GET);
    }

    static async createInvigilator(payload: any) {
        return await makeRequest(urls.invigilator.createInvigilator, RequestMethod.POST, payload);
    }

    static async updateInvigilator(id: string, payload: any) {
        return await makeRequest(`${urls.invigilator.updateInvigilator}/${id}`, RequestMethod.PUT, payload);
    }

    static async deleteInvigilator(id: string) {
        return await makeRequest(`${urls.invigilator.deleteInvigilator}/${id}`, RequestMethod.DELETE);
    }
    static async resetPassword(id: string) {
        return await makeRequest(`${urls.invigilator.resetPassword}/${id}`, RequestMethod.PUT);
    }

    static async  toggleStatus(id: string) {
        return await makeRequest(`${urls.invigilator. toggleStatus}/${id}`, RequestMethod.PUT);
    }
}