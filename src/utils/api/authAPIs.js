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

export const getUserFeePass = async () => {
    const response = await axiosInstance.get('/egopass/getall-userfree')
    return response.data
}

export const getUserTravels = async (params) => {
    const searchParams = new URLSearchParams(params)
    const paramsString = searchParams.toString()

    const response = await axiosInstance.get(`/travels/get-all${paramsString ? `?${paramsString}` : ''}`);
    return response.data;
}

export const getUserTravel = async (travelId) => {
    const response = await axiosInstance.get(`/travels/get/${travelId}`);
    return response.data;
}

export const addTravel = async (travelData) => {
    const response = await axiosInstance.post("/travels/create", travelData);
    return response.data;
}

export const getFreePassQrCode = async (passId) => {
    const response = await axiosInstance.get(`/egopass/get-free/${passId}`);
    return response.data;
}

export const updateProfile = async (profileData) => {
    const response = await axiosInstance.patch('/users/update', profileData, {
        "Content-Type": "multipart/form-data"
    });
    return response.data;
}

export const scanQrCode = async (token) => {
    const response = await axiosInstance.post('/egopass/authenticate', {passToken: token})
    return response.data
}

export const disactivateFreeCode = async (token) => {
    const response = await axiosInstance.post('/egopass/disactivate', {passToken: token})
    return response.data
}

export const registerAbonne = async (userData) => {
    const response = await axiosInstance.post('/users/register', userData)
    return response.data
}

export const registerAgent = async (userData) => {
    const response = await axiosInstance.post('/users/register-agent', userData)
    return response.data
}

export const registerAdmin = async (userData) => {
    const response = await axiosInstance.post('/users/register-admin', userData)
    return response.data
}

export const logOutUser = async () => {
    const response = await axiosInstance.post('/users/logout')
    return response.data
}
