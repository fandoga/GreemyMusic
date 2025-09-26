import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlaylists } from "./playlistThunk";

interface PlaylistState {
    AllPlaylists: any;
    isLoading: boolean;
    error: string;
    hasMorePlaylists: boolean;
}

const initialState: PlaylistState = {
    AllPlaylists: [],
    isLoading: false,
    error: "",
    hasMorePlaylists: true
}

export const playlistSlice = createSlice({
    name: 'playlist',
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
            .addCase(fetchPlaylists.pending, (state) => {
            })
            .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload.offset === 0) {
                    // первая загрузка
                    state.AllPlaylists = action.payload.data.items;
                    state.hasMorePlaylists = true
                  } else {
                    // догружаем
                    state.AllPlaylists = [...state.AllPlaylists, ...action.payload.data.items];
                    if (action.payload.data.next === null) {
                        state.hasMorePlaylists = false
                    }
                  }
                state.isLoading = false;
                state.error = ''
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
    },
})


export default playlistSlice.reducer;