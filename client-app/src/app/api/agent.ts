import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((reslove) => {
    setTimeout(reslove, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

// get a delay when refresh the browser
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});
// The <T> notation in TypeScript is used to denote a generic type.
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  // baseURL + what every inside the ()
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  //   add activity as a body request
  create: (activity: Activity) => request.post<void>("activities", activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
