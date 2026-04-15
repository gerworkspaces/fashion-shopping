import apiInstance from "@/config/api-config";

const setAuthToken = (token: string | null) => {
    if (token) {
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiInstance.defaults.headers.common['Authorization'];
    }
};

export const getData = async (path: string, params = {}) => {
    const response = await apiInstance.get(path, { params });
    return response.data;
};

export const postData = async (path: string, data = {}) => {
    const response = await apiInstance.post(path, data);
    return response.data;
};

export const putData = async (path: string, data = {}) => {
    const response = await apiInstance.put(path, data);
    return response.data;
};

export const deleteData = async (path: string, data = {}) => {
    const response = await apiInstance.delete(path, { data });
    return response.data;
};

export { setAuthToken };
