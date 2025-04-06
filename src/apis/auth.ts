import axiosService from "@/utils/request"
import { API_URL } from "@/common/constant/urls"
import EnvConfig from "@/config/env"

// 用户注册
export const register = (username: string, password: string) => {
    if (EnvConfig.mockEnabled) {
        return Promise.resolve({
            data: {
                msg: "注册成功"
            }
        });
    } else {
        return axiosService.post(`${API_URL.URL_AUTH_REGISTER}`, {
            username: username,
            password: password
        }); 
    }
}

// 用户登陆
export const login = (username: string, password: string) => {
    if (EnvConfig.mockEnabled) {
        return Promise.resolve({
            data: {
                msg: "登陆成功"
            }
        });
    } else {
        return axiosService.post(`${API_URL.URL_AUTH_LOGIN}`, {
            username: username,
            password: password
        });
    }
}


// 用户登出
export const logout = () => {
    return axiosService.post(`${API_URL.URL_AUTH_LOGOUT}`);
}

// 更新用户个人资料
export const updateUserProfile = (id: string, username: string, email: string, phone: string, password: string, admission: boolean) => {
    return axiosService.post(`${API_URL.URL_AUTH_USER}`, {
        id: id,
        username: username,
        email: email,
        phone: phone,
        password: password,
        admission: admission
    });
}