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
