import axiosInstance from "../function/axioInstance";

export const loginApi = async (loginData) => {
    const response = await axiosInstance.post('/users/login', loginData);
    return response.data;
};

export const getUserByEmail = async (email) => {
    const response = await axiosInstance.get(`/users/profil/${email}`);
    return response.data;
}

export const sendOtpRequest = async (identifier) => {
    const response = await axiosInstance.post('/users/request-reset-password', identifier);
    return response.data;
}

export const verifyOtp = async (otpData) => {
    const response = await axiosInstance.post('/users/verify-reset-code', otpData);
    return response.data;
}

export const resetPasswordApi = async (newPasswordData) => {
    const response = await axiosInstance.post('/users/reset-password', newPasswordData);
    return response.data;
}

export const getLogedUser = async () => {
    const response = await axiosInstance.get('/users/profil');
    return response.data;
}

export const getEgoPasses = async (params) => {
    const searchParams = new URLSearchParams(params)
    const paramsString = searchParams.toString()

    const response = await axiosInstance.get(`/egopass/get-all${paramsString ? `?${paramsString}` : ''}`)
    return response.data;
}

export const getUserTravels = async () => {
    const response = await axiosInstance.get('/users/travels');
    return response.data;
}

export const getFreePassQrCode = async (passId) => {
    const response = await axiosInstance.get(`/egopass/get-free/${passId}`);
    return response.data;
}
