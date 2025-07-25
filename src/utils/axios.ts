import axios, {AxiosError} from "axios";
import type {InternalAxiosRequestConfig} from "axios";
import {toast} from "react-toastify";


const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

http.interceptors.response.use((res) => res.data, (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    }
    if (error.response?.status === 500) {
        toast.error('Server error: ' + (error.response?.data || 'Internal server error'));
    }
    return Promise.reject(error)
})

export default http