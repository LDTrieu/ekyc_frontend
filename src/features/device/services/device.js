import { v4 as uuidv4 } from 'uuid';

export const getAllDevicesService = (axiosPrivate) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/device/list/${request_id}`) // device
}

// createDeviceService
export const createDeviceService = (
    axiosPrivate,
    terminalId,
    terminalName,
    password,

) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(`/mobile/auth/signup//${request_id}`, {
        terminalId,
        terminalName,
        password,
    }, {
        withCredentials: false,
    },)

}

export const getDetailDeviceService = (axiosPrivate, terminalId) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/device/detail/${request_id}`, {
        params: {
            terminalId: terminalId,
        }
    }) // device
}
// updateDeviceService
export const updateDeviceService = (axiosPrivate, terminalId, isBlocked) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)

    return axiosPrivate.post(`/portal/device/update/${request_id}`, {
        terminalId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}