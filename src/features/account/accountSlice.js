import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createAccountProfileService,
    updateAccountEkycService,
} from "./services/account";

const initialState = {
    accountAdded: [],
};
export const createAccountProfile = createAsyncThunk(
    "account/createAccountProfile",
    async (
        {
            axiosPrivate,
            fullName,
            email,
            password,
            unitId,
            phoneNumber,
            dateOfBirth,
        },
        thunkAPI
    ) => {
        try {
            const response = await createAccountProfileService(
                axiosPrivate,
                fullName,
                email,
                password,
                unitId,
                phoneNumber,
                dateOfBirth,
            );
            console.log("response", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.status);
        }
    }
);

export const updateAccountEkyc = createAsyncThunk(
    "account/updateAccountEkyc",
    async (
        {
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
            faceImageURL,
        },
        thunkAPI
    ) => {
        try {
            const response = await updateAccountEkycService(
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
                faceImageURL
            );
            console.log("response", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.status);
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState,
});

export default accountSlice.reducer;
