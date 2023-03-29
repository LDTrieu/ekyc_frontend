

export const getAllAccountsService = (axiosPrivate) => {
    console.log("service get all account")
    return axiosPrivate.get('/portal/user/list/1') // Account
}
// createAccountProfileService
export const createAccountProfileService = (
    axiosPrivate,
    fullName,
    email,
    password,
    unitId,
    phoneNumber,
    dateOfBirth,
) => {
    return axiosPrivate.post('/portal/user/create/1', {
        fullName,
        email,
        password,
        unitId,
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
    return axiosPrivate.post('/portal/user/update-ekyc/1', {
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

    console.log("PATCH: ", accountId, isBlocked)
    return axiosPrivate.post('/portal/user/update/123', {
        accountId,
        isBlocked,
    }, {
        withCredentials: false,
    },);
}

export const getListAccountService = (axiosPrivate) => {
    console.log("Get list")
    // return axiosPrivate.get('/portal/Account/list-pdf/123', {
    // }, {
    //     withCredentials: false,
    // },);
    return axiosPrivate.get('/portal/user/list-pdf/123', {
    }, {
        withCredentials: false,
    },);
}

export const getDetailAccountService = (axiosPrivate, accountId) => {
    console.log("service get detail account")
    return axiosPrivate.get('/portal/user/detail/123', {
        params: {
            accountId: accountId,
        }
    }) // Account
}