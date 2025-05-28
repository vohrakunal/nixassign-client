import axios, { } from 'axios';
import { RequestMethod } from './make.request';

export default async function makeUploadRequest(
    url: string,
    method: any,
    formData?: any,
    onUploadProgress?: (progressEvent: ProgressEvent) => void
) {
    let requestConfig: any = {
        baseURL: import.meta.env.VITE_BASE_URL,
        url: url,
        method: method,
        headers: {
            Authorization: localStorage.getItem("authKey") || "",
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    };

    if (method !== RequestMethod.GET && formData) {
        requestConfig.data = formData;
    }

    return await axios.request(requestConfig);
}
