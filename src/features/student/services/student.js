import { v4 as uuidv4 } from 'uuid';
export const getAllStudentsService = (axiosPrivate) => {
    console.log("service get all student")
    return axiosPrivate.get('/portal/student/list/1') // student
}
// createStudentProfileService
export const createStudentProfileService = (
    axiosPrivate,
    studentId,
    email,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    unitId,
    address
) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(`/portal/student/create/${request_id}`, {
        studentId,
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        unitId,
        address
    }, {
        withCredentials: false,
    },)

}

// updateStudentEkycService
export const updateStudentEkycService = (
    axiosPrivate,
    studentId,
    personId,
    fullName,
    nationalId,
    dateOfBirth,
    dateOfExpiry,
    gender,
    address,
    placeOfOrigin,
    nationality,
    nationalIdCardURL,
    faceImageURL) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(`/portal/student/update-ekyc/${request_id}`, {
        studentId,
        personId,
        fullName,
        nationalId,
        dateOfBirth,
        dateOfExpiry,
        gender,
        address,
        placeOfOrigin,
        nationality,
        nationalIdCardURL,
        faceImageURL
    }, {
        withCredentials: false,
    },)

}

// updateStudentService
export const updateStudentService = (axiosPrivate, studentId, isBlocked) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(`/portal/student/update/${request_id}`, {
        studentId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}

export const getListStudentService = (axiosPrivate) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/student/list-pdf/${request_id}`, {
    }, {
        withCredentials: false,
    },);
}

export const getDetailStudentService = (axiosPrivate, studentId) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/student/detail/${request_id}`, {
        params: {
            studentId: studentId,
        }
    }) // student
}