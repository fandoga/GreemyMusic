import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { trackSlice } from "./trackSlice";


export const fetchRecomendations = createAsyncThunk<any, void, { rejectValue: string }>(
    "track/fetchRecomend",
    async (_, thunkAPI) => {
        const limit = 25;
        const accessToken = localStorage.getItem('access-token');
        try {
            const res = await fetch(
                `https://api.spotify.com/v1/playlists/3xMQTDLOIGvj3lWH5e5x6F/tracks?limit=${limit}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const data = await res.json();
            return data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)