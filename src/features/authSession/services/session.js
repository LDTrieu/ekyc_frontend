
export const getAllSessionService = (axiosPrivate) => {
    console.log("service get all session") // not limit
    return axiosPrivate.get('/portal/session/list/1') // session
}
