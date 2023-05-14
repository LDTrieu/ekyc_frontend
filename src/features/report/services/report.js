export const getAllReportsService = (axiosPrivate) => {
    console.log("service get all report")
    return axiosPrivate.get('/portal/report/list/1') // report
}