import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TrackData from "../../pages/main/TrackData"
import { fetchRecomendations } from "./trackThunks";

interface TrackState {
    AllTracks: any;
    DisplayedTracks: TrackData[];
    isLoading: boolean;
    error: string
}

const initialState: TrackState = {
    AllTracks: { items: [] },
    DisplayedTracks: [],
    isLoading: false,
    error: ""
}

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },

        finishLoading(state) {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecomendations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchRecomendations.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = ''
                state.AllTracks = action.payload
            })
            .addCase(fetchRecomendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
    },
})


export default trackSlice.reducer;