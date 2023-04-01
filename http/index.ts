import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.BACKEND_URL,
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig ) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config as InternalAxiosRequestConfig
})
export default $api