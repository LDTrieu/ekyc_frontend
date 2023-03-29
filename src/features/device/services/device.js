export const getAllDevicesService = (axiosPrivate) => {
    console.log("service get all device")
    return axiosPrivate.get('/portal/device/list/1') // student
}

// createDeviceService
export const createDeviceService = (
    axiosPrivate,
    terminalId,
    terminalName,
    password,

) => {
    return axiosPrivate.post('/mobile/auth/signup/1', {
        terminalId,
        terminalName,
        password,
    }, {
        withCredentials: false,
    },)

}