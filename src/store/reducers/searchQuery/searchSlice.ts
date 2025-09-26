import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchQuery } from "./searchThunks";

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

export const searchSlice = createSlice({
    name: 'search',
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
            .addCase(fetchSearchQuery.pending, (state) => {
            })
            .addCase(fetchSearchQuery.fulfilled, (state, action: PayloadAction<any>) => {
                const items = action.payload?.data?.tracks?.items || []
                if (action.payload.offset === 0) {
                    state.AllTracks = items;
                    state.hasMoreTracks = true
                  } else {
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


export default searchSlice.reducer;