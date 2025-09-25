import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { trackSlice } from "./trackSlice";

// export const fetchRecomendations = () => async (dispatch: AppDispatch) => {
//     const accessToken = localStorage.getItem('access-token');
//     const limit = 25;
//     try {
//         dispatch(trackSlice.actions.recomendFetching())
//         const res = await fetch(
//             `https://api.spotify.com/v1/playlists/3xMQTDLOIGvj3lWH5e5x6F/tracks?limit=${limit}`,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//         );
//         const data = await res.json();
//         dispatch(trackSlice.actions.recomendFetchingSucces(data))
//     } catch (e : any) {
//         dispatch(trackSlice.actions.recomendFetchingError(e.message))
//     }
// 


export const fetchRecomendations = createAsyncThunk(
    "track/fetchRecomend",
    async () => {
        const limit = 25;
        const accessToken = localStorage.getItem('access-token');
        const res = await fetch(
            `https://api.spotify.com/v1/playlists/3xMQTDLOIGvj3lWH5e5x6F/tracks?limit=${limit}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        return data
    }
)