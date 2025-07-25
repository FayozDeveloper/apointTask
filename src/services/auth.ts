import http from "../utils/axios.ts";

type LoginInputs = {
    username: string;
    password: string;
}

type LoginResponse = {
    token: string;
    refreshToken?: string;
}

export const loginRequest = async(data: LoginInputs): Promise<LoginResponse> => {
    return await http.post<LoginResponse>('/hr/user/sign-in?include=token', data)
}