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
    address,
    image) => {
    return axiosPrivate.post('/portal/student/create/1', {
        studentId,
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        unitId,
        address,
        image
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
    return axiosPrivate.post('/portal/student/update-ekyc/1', {
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

    console.log("PATCH: ", studentId, isBlocked)
    return axiosPrivate.post('/portal/student/update/123', {
        studentId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}