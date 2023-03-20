import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStore } from "redux";
import {
    createStudentProfileService,
    updateStudentEkycService,
} from "./services/student";

const initialState = {
    studentAdded: [],
    // failAttempt: false,
    // isLoading: false,
    // error: '',
};
export const createStudentProfile = createAsyncThunk(
    "student/createStudentProfile",
    async (
        {
            axiosPrivate,
            studentId,
            email,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            unitId,
            address,
            image,
        },
        thunkAPI
    ) => {
        try {
            const response = await createStudentProfileService(
                axiosPrivate,
                studentId,
                email,
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                unitId,
                address,
                image
            );
            console.log("response", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.status);
        }
    }
);

export const updateStudentEkyc = createAsyncThunk(
    "student/updateStudentEkyc",
    async (
        {
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
            faceImageURL,
        },
        thunkAPI
    ) => {
        try {
            const response = await updateStudentEkycService(
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
                faceImageURL
            );
            console.log("response", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.status);
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState,
});

export default studentSlice.reducer;
