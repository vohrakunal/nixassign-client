import axios from "axios";

import { toast } from "react-toastify";

export const  RequestMethod = {
  POST : "post",
  GET : "get",
  PUT : "put",
  DELETE : "delete",
  PATCH : "patch",
}

export default async function makeRequest(
  url: any,
  method: any,
  inputPayload?: any
) {
  const requestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    url: url,
    method: method,
    headers: {
      Authorization: localStorage.getItem("authKey") || "",
      "ngrok-skip-browser-warning": "69420",
    },
    data: {},
  };

  if (method !== "get" && inputPayload) {
    requestConfig.data = inputPayload;
  }

  return await axios
    .request(requestConfig)
    .then((res) => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch((e) => {
      console.log(e, "error makeReuqesr");
      toast.error(
        e.response.data || e.response.data.message || "Something went wrong"
      );
      return e;
    });
}

export function makeParams(params: any) {
  let paramString = "?";
  for (const param in params) {
    if (params[param].value) {
      if (Number(param) != 0) paramString = paramString + "&";
      paramString =
        paramString + params[param].index + "=" + params[param].value;
    }
  }
  return paramString;
}

export async function makeBasicRequest(
  url: any,
  method: any,
  inputPayload?: any
) {
  let requestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    url: url,
    method: method,
    data: {},
  };

  if (method !== "get" && inputPayload) {
    requestConfig.data = inputPayload;
  }

  try {
    let response = await axios.request(requestConfig);
    return response;
  } catch (error) {
    // axiosHandler(error.response);
    throw error;
  }
}
