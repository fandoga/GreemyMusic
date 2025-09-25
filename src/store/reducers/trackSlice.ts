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
    AllTracks: [],
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
            })
            .addCase(fetchRecomendations.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload.offset === 0) {
                    // первая загрузка
                    state.AllTracks = action.payload.data.items;
                  } else {
                    // догружаем
                    state.AllTracks = [...state.AllTracks.items, ...action.payload.data.items];
                  }
                state.isLoading = false;
                state.error = ''
            })
            .addCase(fetchRecomendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
    },
})


export default trackSlice.reducer;