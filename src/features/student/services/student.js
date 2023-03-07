export const getAllStudentsService = (axiosPrivate) => {
    console.log("service get all student")
    return axiosPrivate.get('/portal/student/list/1') // student
}
