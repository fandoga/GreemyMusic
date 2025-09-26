import { createAsyncThunk } from "@reduxjs/toolkit";

interface fetchTrackArgs {
    offset : number,
    limit : number,
}


export const fetchPlaylists = createAsyncThunk<
        any,
        fetchTrackArgs,
        { rejectValue: string }
    >(
    "track/fetchPlaylist",
    async ({offset, limit = 25}, thunkAPI) => {
        const accessToken = localStorage.getItem('access-token');
        try {
            const res = await fetch(
                `https://api.spotify.com/v1/me/playlists`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const data = await res.json();
            return { data, offset }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)