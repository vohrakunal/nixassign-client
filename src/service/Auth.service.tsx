import makeRequest, { RequestMethod } from "../api/make.request";
import urls from "../api/url"

export class AuthService {
    static async login(payload: any) {
        return await makeRequest(urls.auth.login, RequestMethod.POST, payload)
    }
}