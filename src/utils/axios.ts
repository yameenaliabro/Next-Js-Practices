import Axios from "axios";
import { BASE_URL } from "@src/config"
import { message } from "antd";

const axios = Axios.create({
    baseURL: BASE_URL
})

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const errorMessage = err.response.data.message || err.message
        message.error(errorMessage)
        Promise.reject(errorMessage)
    }
)

export const setaxiostoken = (token: string) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
    console.log(token)
}
export const removeAxiosToken = () => {
    axios.defaults.headers.Authorization = null
}

export default axios