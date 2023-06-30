import { v4 as uuidv4 } from 'uuid';

export const getAllAccountsService = (axiosPrivate) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/user/list/${request_id}`) // Account
}
// createAccountProfileService
export const createAccountProfileService = (
    axiosPrivate,
    fullName,
    email,
    password,
    unitId,
    role,
    phoneNumber,
    dateOfBirth,
) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(
        `/portal/user/create/${request_id}`, {
        fullName,
        email,
        password,
        unitId,
        role,
        phoneNumber,
        dateOfBirth
    }, {
        withCredentials: false,
    },)

}

// updateAccountEkycService
export const updateAccountEkycService = (
    axiosPrivate,
    accountId,
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
    return axiosPrivate.post(`/portal/user/update-ekyc/${request_id}`, {
        accountId,
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

// updateAccountService
export const updateAccountService = (axiosPrivate, accountId, isBlocked) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.post(`/portal/user/update/${request_id}`, {
        accountId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}

export const getListAccountService = (axiosPrivate) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/user/download-pdf/${request_id}`, {
    }, {
        withCredentials: false,
    },);
}

export const getDetailAccountService = (axiosPrivate, accountId) => {
    const unique_id = uuidv4();
    const request_id = unique_id.slice(0, 8)
    return axiosPrivate.get(`/portal/user/detail/${request_id}`, {
        params: {
            accountId: accountId,
        }
    }) // Account
}