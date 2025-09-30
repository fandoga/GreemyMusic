import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>(
    "track/user",
    async (_, thunkAPI) => {
        const accessToken = localStorage.getItem('access-token');
        try {
            const res = await fetch(
                `https://api.spotify.com/v1/me`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const data = await res.json();
            return { data }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)