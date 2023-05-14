export const getAllDevicesService = (axiosPrivate) => {
    console.log("service get all device")
    return axiosPrivate.get('/portal/device/list/1') // device
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

export const getDetailDeviceService = (axiosPrivate, terminalId) => {
    console.log("service get detail device")
    return axiosPrivate.get('/portal/device/detail/123', {
        params: {
            terminalId: terminalId,
        }
    }) // device
}
// updateDeviceService
export const updateDeviceService = (axiosPrivate, terminalId, isBlocked) => {

    console.log("PATCH: ", terminalId, isBlocked)
    return axiosPrivate.post('/portal/device/update/123', {
        terminalId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}