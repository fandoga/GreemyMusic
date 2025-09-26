import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecomendations } from "../track/trackThunks";
import { fetchSearchQuery } from "../searchQuery/searchThunks";

interface TrackState {
    AllTracks: any;
    isLoading: boolean;
    error: string;
    hasMoreTracks: boolean;
}

const initialState: TrackState = {
    AllTracks: [],
    isLoading: false,
    error: "",
    hasMoreTracks: true
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
                    state.hasMoreTracks = true
                  } else {
                    // догружаем
                    state.AllTracks = [...state.AllTracks, ...action.payload.data.items];
                    if (action.payload.data.next === null) {
                        state.hasMoreTracks = false
                    }
                  }
                state.isLoading = false;
                state.error = ''
            })
            .addCase(fetchRecomendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
            .addCase(fetchSearchQuery.pending, (state) => {
            })
            .addCase(fetchSearchQuery.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload.offset === 0) {
                    // первая загрузка
                    state.AllTracks = action.payload.data.tracks.items;
                    state.hasMoreTracks = true
                  } else {
                    // догружаем
                    const items = action.payload?.data?.tracks?.items || []
                    state.AllTracks = [...state.AllTracks, ...items];
                    const next = action.payload?.data?.tracks?.next ?? null
                    if (next === null) {
                        state.hasMoreTracks = false
                    }
                  }
                state.isLoading = false;
                state.error = ''
            })
            .addCase(fetchSearchQuery.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
    },
})


export default trackSlice.reducer;