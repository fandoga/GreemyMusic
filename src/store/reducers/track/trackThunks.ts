import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface fetchTrackArgs {
    offset : number,
    limit : number,
    id?: string,
}


export const fetchRecomendations = createAsyncThunk<
        any,
        fetchTrackArgs,
        { rejectValue: string }
    >(
    "track/fetchRecomend",
    async ({offset, limit = 25, id}, thunkAPI) => {
        const accessToken = localStorage.getItem('access-token');
        try {
            const state = thunkAPI.getState() as RootState;
            const fallbackId = "3xMQTDLOIGvj3lWH5e5x6F";
            const stateId = state.playlistReducer?.currentPlaylist?.Id as string | undefined;
            const resolvedId = id || stateId || fallbackId;
            console.log(id, stateId, fallbackId);
            const res = await fetch(
                `https://api.spotify.com/v1/playlists/${resolvedId}/tracks?offset=${offset}&limit=${limit}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const data = await res.json();
            return { data, offset }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)