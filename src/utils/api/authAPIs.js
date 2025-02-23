import axiosInstance from "../function/axioInstance";

export const loginApi = async (loginData) => {
    const response = await axiosInstance.post('/users/login', loginData);
    return response.data;
};
