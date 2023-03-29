import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createDeviceService, updateDeviceService,
} from "./services/device";

export const createDeviceProfile = createAsyncThunk(
    "device/createDeviceProfile",
    async (
        {
            axiosPrivate,
            terminalId,
            terminalName,
            password
        },
        thunkAPI
    ) => {
        try {
            const response = await createDeviceService(
                axiosPrivate,
                terminalId,
                terminalName,
                password
            );
            console.log("response", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.status);
        }
    }
);
