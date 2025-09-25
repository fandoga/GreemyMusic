import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TrackData from "../../pages/main/TrackData"
import { fetchRecomendations } from "./trackThunks";

interface TrackState {
    AllTracks: any;
    DisplayedTracks: TrackData[];
    isLoading: boolean;
    error: string;
    hasMoreTracks: boolean;
}

const initialState: TrackState = {
    AllTracks: [],
    DisplayedTracks: [],
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
                    // if ((action.payload.data.items.length) < action.payload.limit) {
                    //     state.hasMoreTracks = false
                    // }
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