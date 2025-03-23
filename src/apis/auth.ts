import axios from "axios"
import { API_URL } from "@/common/constant/urls"

// 用户注册
export const register = (username: string, password: string) => {
    return axios.post(`${API_URL.URL_AUTH_REGISTER}`, {
        username: username,
        password: password
    });
}

// 用户登陆
export const login = (username: string, password: string) => {
    return axios.post(`${API_URL.URL_AUTH_LOGIN}`, {
        username: username,
        password: password
    });
}


// 用户登出
export const logout = () => {
    return axios.post(`${API_URL.URL_AUTH_LOGOUT}`);
}

// 更新用户个人资料
export const updateUserProfile = (id: string, username: string, email: string, phone: string, password: string, admission: boolean) => {
    return axios.post(`${API_URL.URL_AUTH_USER}`, {
        id: id,
        username: username,
        email: email,
        phone: phone,
        password: password,
        admission: admission
    });
}